package mukodjman_backend.service;

import mukodjman_backend.model.Comment;
import mukodjman_backend.repository.CommentRepository;
import mukodjman_backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CommentService {

    @Autowired
    private CommentRepository repository;

    @Autowired
    private UsersRepository usersRepository;

    public void saveComment(long userId, long dreamId, String content) {
        Comment comment = new Comment();

        comment.setUser(usersRepository.findById(userId).get());
        comment.setDreamId(dreamId);
        comment.setContent(content);
        comment.setCreated_at(LocalDateTime.now());
        repository.save(comment);
    }

}
