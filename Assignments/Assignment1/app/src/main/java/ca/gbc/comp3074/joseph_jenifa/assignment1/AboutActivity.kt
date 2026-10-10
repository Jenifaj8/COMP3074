package ca.gbc.comp3074.joseph_jenifa.assignment1

import android.graphics.Color
import android.graphics.drawable.ColorDrawable
import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class AboutActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about)
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        supportActionBar?.title = "Back to Pay Calculator"
        supportActionBar?.setBackgroundDrawable(
            ColorDrawable(
                Color.rgb(103, 80, 164)
            )
        )
    }
    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}