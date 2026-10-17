package ca.gbc.comp3074.joseph_jenifa.lab4.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface CustomerDao {

    @Insert(onConflict = OnConflictStrategy.ABORT)
    suspend fun insert(customer: Customer)

    @Delete
    suspend fun delete(customer: Customer)

    @Query("SELECT * FROM customers ORDER BY id")
    fun getAllCustomers(): Flow<List<Customer>>

    @Query(
        "SELECT * FROM customers " +
                "WHERE name LIKE '%' || :searchText || '%' " +
                "ORDER BY name"
    )
    fun searchCustomers(searchText: String): Flow<List<Customer>>

    @Update
    suspend fun update(customer: Customer)
}