package ca.gbc.comp3074.joseph_jenifa.lab3

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Android
import androidx.compose.material.icons.filled.ChatBubbleOutline
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun MessageScreen() {
    val context = LocalContext.current

    val messages = remember {
        mutableStateListOf<Message>().apply {
            addAll(loadMessage(context))
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(40.dp)
    ) {
        Button(
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFF7B1FA2),
                contentColor = Color.White
            ),
            onClick = {
                val messageNumber = messages.size + 1

                val newMessage = Message(
                    sender = "New Messages",
                    replier = "New message $messageNumber"
                )

                messages.add(index = 0, newMessage)
            }
        ) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = "Add icon"
            )
            Spacer(modifier = Modifier.width(5.dp))
            Text("New Message")
        }

        LazyMessageList(messages)
    }
}

@Composable
fun MessageItem(message: Message) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Icon(
            imageVector = Icons.Default.ChatBubbleOutline,
            contentDescription = "Android Icon",
            modifier = Modifier.size(40.dp)
        )

        Column(
            modifier = Modifier
                .padding(10.dp)
                .fillMaxWidth()
        ) {
            Text(
                text = message.sender,
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(5.dp))

            Text(
                text = message.replier,
                fontSize = 16.sp,
                fontWeight = FontWeight.Normal
            )
        }
    }
}

@Composable
fun SimpleMessageList(messages: List<Message>) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        messages.forEach { message ->
            MessageItem(message)
            HorizontalDivider()
        }
    }
}

@Composable
fun LazyMessageList(messages: List<Message>) {
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        item {
            Text(
                text = "Messages",
                fontSize = 26.sp,
                fontWeight = FontWeight.ExtraBold,
                modifier = Modifier.padding(16.dp)
            )
        }

        items(messages) { message ->
            MessageItem(message)
            HorizontalDivider()
        }
    }
}