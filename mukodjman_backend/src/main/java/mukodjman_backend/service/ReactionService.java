package mukodjman_backend.service;

import mukodjman_backend.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class ReactionService {
    @Autowired
    private ReactionRepository reactionRepository;



}
