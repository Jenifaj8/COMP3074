package ca.gbc.comp3074.joseph_jenifa.lab4.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import ca.gbc.comp3074.joseph_jenifa.lab4.data.Customer

@Composable
fun CustomerRow(
    customer: Customer,
    onDelete: () -> Unit,
    onEditCustomer: (Customer) -> Unit
) {
    Card(
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(
                modifier = Modifier.weight(1f)
            ) {
                Text(
                    text = customer.name,
                    style = MaterialTheme.typography.titleMedium
                )

                Text("ID: ${customer.id}")
                Text("Age: ${customer.age}")

                Text(
                    if (customer.isActive)
                        "Active customer"
                    else
                        "Inactive customer"
                )
            }
            Button(
                onClick = { onEditCustomer(customer) }
            ) {
                Text("Edit")
            }

            TextButton(onClick = onDelete) {
                Text("Delete")
            }
        }
    }
}