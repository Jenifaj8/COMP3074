
package ca.gbc.comp3074.joseph_jenifa.lab5

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import com.google.android.gms.tasks.CancellationTokenSource
import ca.gbc.comp3074.joseph_jenifa.lab5.ui.theme.Lab5Theme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            Lab5Theme {
                LocationScreen()
            }
        }
    }
}

@Composable
fun LocationScreen() {

    val context = LocalContext.current

    val fusedClient = remember(context) {
        LocationServices.getFusedLocationProviderClient(context)
    }

    var latitude by remember { mutableStateOf<String?>(null) }
    var longitude by remember { mutableStateOf<String?>(null) }
    var status by remember {
        mutableStateOf("Tap the button to get your location")
    }

    fun hasPermission(): Boolean {
        val fine = ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        val coarse = ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        return fine || coarse
    }

    fun getLocation() {
        if (!hasPermission()) {
            status = "Location permission required"
            return
        }

        latitude = null
        longitude = null
        status = "Finding location..."

        val tokenSource = CancellationTokenSource()

        fusedClient.getCurrentLocation(
            Priority.PRIORITY_HIGH_ACCURACY,
            tokenSource.token
        ).addOnSuccessListener { location ->

            if (location != null) {
                latitude = "%.5f".format(location.latitude)
                longitude = "%.5f".format(location.longitude)
                status = "Location found!"
            } else {
                status = "Location not available"
            }

        }.addOnFailureListener { error ->
            status = "Error: ${error.localizedMessage}"
        }
    }

    val permissionLauncher = rememberLauncherForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { result ->

        if (result.values.any { it }) {
            getLocation()
        } else {
            status = "Location permission denied"
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {

        Text(
            text = "GPS Location",
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Center
        )

        Spacer(modifier = Modifier.height(24.dp))

        Text(
            text = status,
            fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(16.dp))

        if (latitude != null && longitude != null) {
            Text(
                text = "Latitude: $latitude",
                fontWeight = FontWeight.Bold
            )

            Text(
                text = "Longitude: $longitude",
                fontWeight = FontWeight.Bold
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        Button(
            onClick = {
                if (hasPermission()) {
                    getLocation()
                } else {
                    permissionLauncher.launch(
                        arrayOf(
                            Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION
                        )
                    )
                }
            }
        ) {
            Text(
                text = "Get Current Location",
                fontWeight = FontWeight.Bold
            )
        }

        // Open Google Maps with the retrieved coordinates
        if (latitude != null && longitude != null) {

            Spacer(modifier = Modifier.height(12.dp))

            Button(
                onClick = {
                    val intent = Intent(context, MapsActivity::class.java)
                    intent.putExtra("latitude", latitude!!.toDouble())
                    intent.putExtra("longitude", longitude!!.toDouble())
                    context.startActivity(intent)
                }
            ) {
                Text(
                    text = "View on Map",
                    fontWeight = FontWeight.Bold
                )
            }
        }
    }
}
