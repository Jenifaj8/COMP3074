package ca.gbc.comp3074.joseph_jenifa.labex9.components

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController

@Composable
fun ContactApp(){
    val navController = rememberNavController()
    NavHost(
        navController = navController,
        startDestination = "contacts"
    ){
        composable("contacts"){
            ContactListScreen(
                onContactClick = {
                    userId -> navController.navigate("contact/$userId")
                }
            )
        }

        composable("contact/{userId}") { backStackEntry ->
            val userId = backStackEntry.arguments?.getString("userId")?.toIntOrNull()
            ContactDetailScreen(
                userId = userId,
                onBack = {
                    navController.popBackStack()
                }
            )
        }

    }
}
