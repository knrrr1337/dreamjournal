package mukodjman_backend.service;

import mukodjman_backend.repository.FollowersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class FollowersService {

    @Autowired
    private FollowersRepository repository;

    public void followUser(@PathVariable long id) {}


    public void unfollowUser(long userId, long userToBeUnfollowed) {
        System.out.println("userid " + userId + " unfollowed " + userToBeUnfollowed);
    }

}

