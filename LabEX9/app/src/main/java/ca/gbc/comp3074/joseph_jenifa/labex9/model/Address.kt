package ca.gbc.comp3074.joseph_jenifa.labex9.model

data class Address(
    val street: String,
    val suite: String,
    val city: String,
    val geo: Geo,
    val zipcode: String
)
