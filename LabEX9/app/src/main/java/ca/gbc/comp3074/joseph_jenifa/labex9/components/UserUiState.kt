package ca.gbc.comp3074.joseph_jenifa.labex9.components

import ca.gbc.comp3074.joseph_jenifa.labex9.model.User

sealed interface UserUiState {
    data object Loading: UserUiState
    data class Success(val users: List<User>): UserUiState
    data class Error(val message: String): UserUiState
}