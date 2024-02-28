package com.Retails.POS.Controllers;
import com.Retails.POS.Models.Session;
import com.Retails.POS.Services.SessionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/session")
public class SessionController {

    @Autowired
    private SessionServices sessionService;

    @PostMapping("/")
    public ResponseEntity<Session> startSession(@RequestBody Session session) {
        session.setStartTime(new Date());
        Session startSession = sessionService.createSession(session);
        return ResponseEntity.ok(startSession);
    }


    @PutMapping("/{sessionId}")
    public ResponseEntity<Session> closeSession(@PathVariable String sessionId, @RequestBody Session updatedSession) {
        Session closedSession = sessionService.closeSession(sessionId, updatedSession);
        if (closedSession == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(closedSession);
    }

    @GetMapping(value = "/")
    public ResponseEntity<List<Session>> getSessions(){
        List<Session> sessionList = sessionService.getAllSessions();
        return ResponseEntity.ok(sessionList);
    }

    @DeleteMapping(value = "/{sessionId}")
    public ResponseEntity<String> deleteSession(@PathVariable String sessionId){
        sessionService.deleteSessions(sessionId);
        return ResponseEntity.ok("Ok");
    }
}
