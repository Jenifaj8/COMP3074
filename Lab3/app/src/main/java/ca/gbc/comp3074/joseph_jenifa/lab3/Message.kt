package ca.gbc.comp3074.joseph_jenifa.lab3

import android.content.Context

data class Message (
    val sender: String,
    val replier: String
)

fun loadMessage(context: Context): List<Message>{
    val senders = context.resources.getStringArray(R.array.message_senders)
    val repliers = context.resources.getStringArray(R.array.message_repliers)

    return senders.zip(repliers) { sender, replier ->
        Message(sender = sender, replier = replier)
    }
}