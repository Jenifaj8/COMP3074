package ca.gbc.comp3074.joseph_jenifa.assignment1

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import ca.gbc.comp3074.joseph_jenifa.assignment1.ui.theme.Assignment1Theme
import android.content.Intent
import androidx.compose.material3.ButtonDefaults
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            Assignment1Theme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    PayCalculator(
                        modifier = Modifier.padding(innerPadding)
                    )
                }
            }
        }
    }
}

@Composable
fun PayCalculator(modifier: Modifier = Modifier) {

    val context = LocalContext.current
    var hoursWorked by remember { mutableStateOf("") }
    var hourlyRate by remember { mutableStateOf("") }
    var taxRate by remember { mutableStateOf("") }

    var pay by remember { mutableStateOf(0.0) }
    var overtimePay by remember { mutableStateOf(0.0) }
    var totalPay by remember { mutableStateOf(0.0) }
    var tax by remember { mutableStateOf(0.0) }

    var taxRateError by remember { mutableStateOf("") }

    Column(
        modifier = modifier.padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Pay Calculator",
            fontSize = 36.sp,
            fontWeight = FontWeight.Bold
        )
        TextField(
            value = hoursWorked,
            onValueChange = { hoursWorked = it },
            modifier = Modifier.fillMaxWidth(),
            label = {
                Text(
                    text = "Hours Worked",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            }

        )
        TextField(
            value = hourlyRate,
            onValueChange = { hourlyRate = it },
            modifier = Modifier.fillMaxWidth(),
            label = {
                Text(
                    text = "Hourly Rate",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        )
        TextField(
            value = taxRate,
            onValueChange = { taxRate = it },
            modifier = Modifier.fillMaxWidth(),
            label = {
                Text(
                    text = "Tax Rate (%)",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold
                )
            },
            placeholder = { Text("e.g. 15") },
            supportingText = {
                Text(
                    text = "Enter 10 for 10%",
                    fontSize = 16.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        )

        if (taxRateError.isNotEmpty()) {
            Text(
                text = taxRateError,
                color = MaterialTheme.colorScheme.error
            )
        }
        Button(
            modifier = Modifier.padding(top = 16.dp, bottom = 16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF6750A4),
                contentColor = Color.White
            ),
            onClick = {
                val hours = hoursWorked.toDoubleOrNull() ?: 0.0
                val rate = hourlyRate.toDoubleOrNull() ?: 0.0
                val taxRateValue = taxRate.toDoubleOrNull()

                if (taxRateValue == null || taxRateValue.isNaN() ||
                    taxRateValue.isInfinite() || taxRateValue < 0 || taxRateValue > 100
                ) {
                    taxRateError = "Please enter a valid tax rate (e.g. 15 for 15%)"
                    return@Button
                } else {
                    taxRateError = ""
                }

                if (hours <= 40) {
                    pay = hours * rate
                    overtimePay = 0.0
                } else {
                    pay = 40 * rate
                    overtimePay = (hours - 40) * rate * 1.5
                }
                totalPay = pay + overtimePay
                tax = pay * (taxRateValue / 100)
            }
        ) {
            Text(
                text = "Calculate",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )
        }

        Text(
            text = "Pay: $${"%.2f".format(pay)}",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )

        Text(
            text = "Overtime Pay: $${"%.2f".format(overtimePay)}",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )

        Text(
            text = "Total Pay: $${"%.2f".format(totalPay)}",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )

        Text(
            text = "Tax: $${"%.2f".format(tax)}",
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )
        Button(
            modifier = Modifier.padding(top = 16.dp),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF6750A4),
                contentColor = Color.White
            ),
            onClick = {
                val intent = Intent(context, AboutActivity::class.java)
                context.startActivity(intent)
            }
        ) {
            Text(
                text = "About",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
            )
        }
    }
}



@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Assignment1Theme {
        PayCalculator()
    }
}