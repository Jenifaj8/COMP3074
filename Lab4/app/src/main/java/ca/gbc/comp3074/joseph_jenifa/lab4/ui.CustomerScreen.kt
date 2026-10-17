package ca.gbc.comp3074.joseph_jenifa.lab4.ui

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import ca.gbc.comp3074.joseph_jenifa.lab4.data.Customer

@Composable
fun CustomerScreen(
    customers: List<Customer>,
    onAddCustomer: (String, Int, Boolean) -> Unit,
    onDeleteCustomer: (Customer) -> Unit,
    onEditCustomer: (Customer) -> Unit,
    customerToEdit: Customer?,
    onUpdateCustomer: (Customer) -> Unit,
    searchText: String,
    onSearchTextChange: (String) -> Unit,
    onSearch: () -> Unit,
    onClearSearch: () -> Unit
) {
    var name by rememberSaveable { mutableStateOf("") }
    var ageText by rememberSaveable { mutableStateOf("") }
    var isActive by rememberSaveable { mutableStateOf(false) }
    var message by rememberSaveable { mutableStateOf<String?>(null) }

    LaunchedEffect(customerToEdit) {
        if (customerToEdit != null) {
            name = customerToEdit.name
            ageText = customerToEdit.age.toString()
            isActive = customerToEdit.isActive
            message = null
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(40.dp)
    ) {
        Text(
            text = "Room Customer Demo",
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(Modifier.height(12.dp))

        // Customer name
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Customer name") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(8.dp))

        // Customer age
        OutlinedTextField(
            value = ageText,
            onValueChange = { newValue ->
                if (newValue.all { it.isDigit() }) {
                    ageText = newValue
                }
            },
            label = { Text("Age") },
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Number
            ),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        // Active customer switch
        Row(
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Active customer")

            Spacer(Modifier.width(8.dp))

            Switch(
                checked = isActive,
                onCheckedChange = { isActive = it }
            )
        }

        // Add Customer button
        Button(
            onClick = {
                val age = ageText.toIntOrNull()

                if (name.isBlank() || age == null) {
                    message = "Enter a valid name and age."
                } else {
                    if (customerToEdit != null) {
                        onUpdateCustomer(
                            customerToEdit.copy(
                                name = name.trim(),
                                age = age,
                                isActive = isActive
                            )
                        )
                        message = "Customer updated."
                    } else {
                        onAddCustomer(
                            name.trim(),
                            age,
                            isActive
                        )
                        message = "Customer submitted."
                    }

                    name = ""
                    ageText = ""
                    isActive = false
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(
                if (customerToEdit != null) {
                    "Save Changes"
                } else {
                    "Add Customer"
                }
            )
        }

        // Display message
        message?.let {
            Spacer(Modifier.height(8.dp))
            Text(it)
        }

        Spacer(Modifier.height(12.dp))

        // Search customer by name
        OutlinedTextField(
            value = searchText,
            onValueChange = onSearchTextChange,
            label = { Text("Search customer by name") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(8.dp))

        // Search and Clear buttons
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Button(
                onClick = onSearch,
                modifier = Modifier.weight(1f)
            ) {
                Text("Search")
            }

            OutlinedButton(
                onClick = onClearSearch,
                modifier = Modifier.weight(1f)
            ) {
                Text("Clear")
            }
        }

        Spacer(Modifier.height(12.dp))

        // Display customer list
        CustomerList(
            customers = customers,
            onDeleteCustomer = onDeleteCustomer,
            onEditCustomer = onEditCustomer,
            modifier = Modifier.weight(1f)
        )
    }
}