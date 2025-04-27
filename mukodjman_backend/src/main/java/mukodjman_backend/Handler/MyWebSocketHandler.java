package mukodjman_backend.Handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

    private List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("Session added. Total sessions: " + sessions.size());
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//        String msg = message.getPayload();
//        switch (msg) {
//            case "invalidateSession":
//                sessions.remove(session);
//                System.out.println("Invalidating session...");
//                break;
//        }
        System.out.println("Received message: " + message.getPayload());

        session.sendMessage(new TextMessage("Server received: " + message.getPayload()));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    // Method to send a message to all connected clients
    public void sendMessageToAll(String message) {
        for (WebSocketSession session : sessions) {
            try {
                System.out.println("SENDING MESSAGE: " + message);
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}