
package ca.gbc.comp3074.joseph_jenifa.labex9.components

import android.content.ActivityNotFoundException
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.widget.Toast

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack

import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue

import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

import ca.gbc.comp3074.joseph_jenifa.labex9.api.RetrofitInstance
import ca.gbc.comp3074.joseph_jenifa.labex9.model.User

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContactDetailScreen(
    userId: Int?,
    onBack: () -> Unit
) {

    var user by remember(userId) {
        mutableStateOf<User?>(null)
    }

    var errorMessage by remember(userId) {
        mutableStateOf<String?>(null)
    }

    var loading by remember(userId) {
        mutableStateOf(true)
    }

    LaunchedEffect(userId) {

        if (userId == null) {
            errorMessage = "Invalid user ID."
            loading = false
            return@LaunchedEffect
        }

        try {
            user = RetrofitInstance.api.getUserById(userId)
        } catch (e: Exception) {
            errorMessage = e.message ?: "Unable to load contact."
        } finally {
            loading = false
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text("Contact Details")
                },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Back"
                        )
                    }
                }
            )
        }
    ) { paddingValues ->

        when {
            loading -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }

            errorMessage != null -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                        .padding(24.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Error: $errorMessage")
                }
            }

            user != null -> {
                ContactDetails(
                    user = user!!,
                    modifier = Modifier.padding(paddingValues)
                )
            }
        }
    }
}

@Composable
fun ContactDetails(
    user: User,
    modifier: Modifier = Modifier
) {

    val context = LocalContext.current

    Column(
        modifier = modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(20.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {

        // Contact information
        Text(
            text = user.name,
            style = MaterialTheme.typography.headlineMedium
        )

        DetailRow("ID", user.id.toString())
        DetailRow("Username", user.username)
        DetailRow("Email", user.email)

        Text(
            text = "Phone",
            fontWeight = FontWeight.Bold
        )

        Text(
            text = user.phone,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.clickable {
                dialPhoneNumber(context, user.phone)
            }
        )

        DetailRow("Website", user.website)

        HorizontalDivider()

        // Address information
        Text(
            text = "Address",
            style = MaterialTheme.typography.titleMedium
        )

        DetailRow("Street", user.address.street)
        DetailRow("Suite", user.address.suite)
        DetailRow("City", user.address.city)
        DetailRow("Zip Code", user.address.zipcode)
        DetailRow("Latitude", user.address.geo.lat)
        DetailRow("Longitude", user.address.geo.lng)

        HorizontalDivider()

        // Company information
        Text(
            text = "Company",
            style = MaterialTheme.typography.titleMedium
        )

        DetailRow("Name", user.company.name)
        DetailRow("Catch Phrase", user.company.catchPhrase)
        DetailRow("Business", user.company.bs)
    }
}

@Composable
fun DetailRow(
    label: String,
    value: String
) {
    Column {
        Text(
            text = label,
            style = MaterialTheme.typography.labelMedium,
            fontWeight = FontWeight.Bold
        )

        Text(text = value)
    }
}

// Open the Android dialer without making a phone call
fun dialPhoneNumber(
    context: Context,
    phoneNumber: String
) {

    val phoneUri = Uri.parse("tel:$phoneNumber")

    val intent = Intent(
        Intent.ACTION_DIAL,
        phoneUri
    )

    try {
        context.startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        Toast.makeText(
            context,
            "No phone dialer available",
            Toast.LENGTH_LONG
        ).show()
    }
}
