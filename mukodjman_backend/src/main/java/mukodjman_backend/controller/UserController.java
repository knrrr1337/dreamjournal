package mukodjman_backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import mukodjman_backend.Handler.MyWebSocketHandler;
import mukodjman_backend.dto.user.*;
import mukodjman_backend.model.User;
import mukodjman_backend.service.FollowersService;
import mukodjman_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("user/")
@Tag(name="felhasznalok", description="felhasznalok kontrollere")
public class UserController {



    @Autowired
    private UserService service;
    private FollowersService followersService;

    @GetMapping("/get/{id}")
    public UserRead getUser(@PathVariable int id) {
        return service.getUser(id);
    }

    @GetMapping("/get-user/{id}")
    public DrogosUser getUserById(@PathVariable int id) {
        return service.getUserr(id);
    }

    @PostMapping("/block-user")
    public String blockUser(@RequestBody BlockUserRequest blockUserRequest) {
        System.out.println(blockUserRequest.getUserId() + " " + blockUserRequest.getAuthorId());
        service.blockUser(blockUserRequest.getUserId(), blockUserRequest.getAuthorId());
        System.out.println(blockUserRequest);
        return "user blocked";
    }

    @PostMapping("/unblock-user")
    public void unblockUser(@RequestBody BlockUserRequest blockUserRequest) {
//        System.out.println(blockUserRequest.getUserId() + " " + blockUserRequest.getAuthorId());
        service.unblockUser(blockUserRequest.getUserId(), blockUserRequest.getAuthorId());
    }

    @PostMapping("/follow-user")
    public void followUser(@RequestBody FollowRequest followRequest) {
        service.followUser(followRequest.getUserId(), followRequest.getUserToBeFollowedId());
    }

    @PostMapping("unfollow-user/{id}")
    public void unFollowUser(@PathVariable long id, @RequestBody FollowRequest fr) {
        System.out.println(id + " " + fr.getUserToBeFollowedId());
        service.unfollowUser(id, fr.getUserToBeFollowedId());

        //        followersService.unfollowUser(id, fr.getUserToBeFollowedId());
    }



    @GetMapping("get/list")
    public List<User> getUserList() {
        List<User> users = service.listUsers();
        for (User user : users) {
            System.out.println(user);
        }
        return service.listUsers();
    }

    @GetMapping("get-followed-users/{id}")
    public List<FollowedUser> getFollowedUsers(@PathVariable long id) {
        return service.getFollowedUsers2(id);
    }

    @GetMapping("get-users-following-user/{id}")
    public List<FollowedUser> getUsersFollowingUser(@PathVariable long id) {
        return service.getUsersFollowingUser(id);
    }

    @GetMapping("get-blocked-users/{id}")
    public List<BlockedUser> getBlockedUsers(@PathVariable long id) {
        return service.getBlockedUsers(id);
    }
}
