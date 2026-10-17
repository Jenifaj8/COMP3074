
package ca.gbc.comp3074.joseph_jenifa.lab5

import android.os.Bundle
import androidx.fragment.app.FragmentActivity
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.gms.maps.GoogleMap
import com.google.android.gms.maps.OnMapReadyCallback
import com.google.android.gms.maps.SupportMapFragment
import com.google.android.gms.maps.model.LatLng
import com.google.android.gms.maps.model.MarkerOptions
import ca.gbc.comp3074.joseph_jenifa.lab5.databinding.ActivityMapsBinding

class MapsActivity : FragmentActivity(), OnMapReadyCallback {

    private lateinit var mMap: GoogleMap
    private lateinit var binding: ActivityMapsBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMapsBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Get the map fragment from the layout
        val mapFragment = supportFragmentManager
            .findFragmentById(R.id.map) as SupportMapFragment

        mapFragment.getMapAsync(this)
    }

    override fun onMapReady(googleMap: GoogleMap) {
        mMap = googleMap

        // Get coordinates from MainActivity
        val latitude = intent.getDoubleExtra("latitude", Double.NaN)
        val longitude = intent.getDoubleExtra("longitude", Double.NaN)

        // Check if coordinates were received
        if (latitude.isNaN() || longitude.isNaN()) {
            return
        }

        // Use the current location instead of Sydney
        val currentLocation = LatLng(latitude, longitude)

        // Add a marker at the current location
        mMap.addMarker(
            MarkerOptions()
                .position(currentLocation)
                .title("Current Location")
        )

        // Move the camera to the current location
        mMap.moveCamera(
            CameraUpdateFactory.newLatLngZoom(currentLocation, 15f)
        )
    }
}
