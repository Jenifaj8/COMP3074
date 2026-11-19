
package ca.gbc.comp3074.joseph_jenifa.labex9.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.ListItem
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
import androidx.compose.ui.text.font.FontWeight
import ca.gbc.comp3074.joseph_jenifa.labex9.api.RetrofitInstance
import ca.gbc.comp3074.joseph_jenifa.labex9.model.User

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContactListScreen(
    onContactClick: (Int) -> Unit
) {
    var uiState by remember {
        mutableStateOf<UserUiState>(UserUiState.Loading)
    }

    LaunchedEffect(Unit) {
        uiState = try {
            val users = RetrofitInstance.api.getUsers()
            UserUiState.Success(users)
        } catch (e: Exception) {
            UserUiState.Error(e.message ?: "Unknown error")
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Contact List") }
            )
        }
    ) { paddingValues ->

        when (val state = uiState) {

            UserUiState.Loading -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }

            is UserUiState.Success -> {
                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues)
                ) {
                    items(
                        items = state.users,
                        key = { it.id }
                    ) { user ->
                        ContactRow(
                            user = user,
                            onClick = {
                                onContactClick(user.id)
                            }
                        )
                    }
                }
            }

            is UserUiState.Error -> {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(paddingValues),
                    contentAlignment = Alignment.Center
                ) {
                    Text("Error: ${state.message}")
                }
            }
        }
    }
}

@Composable
fun ContactRow(
    user: User,
    onClick: () -> Unit
) {
    ListItem(
        headlineContent = {
            Text(
                text = user.name,
                fontWeight = FontWeight.Bold
            )
        },
        supportingContent = {
            Text(user.email)
        },
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    )

    HorizontalDivider()
}
