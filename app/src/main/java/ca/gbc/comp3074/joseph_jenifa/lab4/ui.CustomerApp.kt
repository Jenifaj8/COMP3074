package ca.gbc.comp3074.joseph_jenifa.lab4.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.compose.runtime.*
import ca.gbc.comp3074.joseph_jenifa.lab4.data.Customer
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flowOf

@Composable
fun CustomerApp(
    viewModel: CustomerViewModel
) {
    var searchText by remember { mutableStateOf("") }
    var appliedSearch by remember { mutableStateOf("") }
    var customerToEdit by remember { mutableStateOf<Customer?>(null) }

    val customerFlow = remember(viewModel, appliedSearch) {
        if (appliedSearch.isBlank()) {
            viewModel.customers
        } else {
            viewModel.searchCustomers(appliedSearch)
        }
    }

    val customers by customerFlow
        .collectAsStateWithLifecycle(initialValue = emptyList())

    CustomerScreen(
        customers = customers,
        onAddCustomer = viewModel::addCustomer,
        onDeleteCustomer = viewModel::deleteCustomer,
        onEditCustomer = { customer ->
            customerToEdit = customer },
        searchText = searchText,
        onSearchTextChange = { searchText = it },
        onSearch = { appliedSearch = searchText.trim() },
        customerToEdit = customerToEdit,
        onUpdateCustomer = { updatedCustomer ->
            viewModel.updateCustomer(updatedCustomer)
            customerToEdit = null },
        onClearSearch = {
            searchText = ""
            appliedSearch = ""
        }
    )
}