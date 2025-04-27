package mukodjman_backend.service;

import mukodjman_backend.converter.UserConverter;
import mukodjman_backend.dto.Login.LoginRequest;
import mukodjman_backend.dto.user.BlockedUser;
import mukodjman_backend.dto.user.DrogosUser;
import mukodjman_backend.dto.user.FollowedUser;
import mukodjman_backend.dto.user.UserRead;
import mukodjman_backend.model.Block;
import mukodjman_backend.model.Followers;
import mukodjman_backend.model.User;
import mukodjman_backend.repository.BlockRepository;
import mukodjman_backend.repository.FollowersRepository;
import mukodjman_backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UsersRepository repository;

    @Autowired
    private BlockRepository blockRepository;

    @Autowired FollowersRepository followerRepository;

    @Autowired
    private FollowersRepository followersRepository;

    @Autowired
    private UsersRepository usersRepository;

    public UserRead getUser(long id) {
        if (repository.existsById(id)) {
            return UserConverter.convertModelToRead(repository.getReferenceById(id));
        }
        return null;
    }

    public DrogosUser getUserr(long id) {
        User mybeloved = repository.getReferenceById(id);
        DrogosUser du = new DrogosUser();
        du.setId(mybeloved.getId());
        du.setUsername(mybeloved.getUsername());
        du.setBio(mybeloved.getBio());
        du.setProfilePicture(mybeloved.getProfilePicture());
        du.setCreated_at(mybeloved.getCreated_at());

        return du;
    }

    public String createUser(User user) {
        if (!repository.existsByEmail(user.getEmail())) {
            repository.save(user);
            return "";
        }
        return "An account has already been created with this email address.";
    }

    public List<FollowedUser> getUsersFollowingUser(long id) {
        List<Followers> followers = followersRepository.findAllFollowersByUserId(id);
        List<FollowedUser> followedUsers = new ArrayList<>();
        for (Followers follower : followers) {
            User xd = usersRepository.findById(follower.getFollower().getId()).get();
            FollowedUser fu = new FollowedUser();
            fu.setId(xd.getId());
            fu.setUsername(xd.getUsername());
            fu.setEmail(xd.getEmail());
            fu.setBio(xd.getBio());
            fu.setProfilePicture(xd.getProfilePicture());
            fu.setCreated_at(xd.getCreated_at());
            followedUsers.add(fu);
        }
        return followedUsers;

        //        return followers.stream()
//                .map(Followers::getFollowed)
//                .map(user -> new FollowedUser(user.getId(), user.getUsername(), user.getEmail(), user.getProfilePicture(), user.getBio(), user.getCreated_at()))
//                .collect(Collectors.toList());
    }

    public void unfollowUser(long id, long id2) {
        System.out.println(id + " " + id2);
        followerRepository.unfollow(id, id2);
    }

    public User loginUser(LoginRequest loginRequest) {
        if (repository.existsByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword())) {
            User found = repository.findByUsername(loginRequest.getUsername());
            User foundUser = new User();
            foundUser.setEmail(found.getEmail());
            foundUser.setPassword(found.getPassword());
            foundUser.setUsername(found.getUsername());
            foundUser.setId(found.getId());
            foundUser.setBlockedUsers(found.getBlockedUsers());
            foundUser.setBio(found.getBio());
            foundUser.setDreams(found.getDreams());
            foundUser.setFollowers(found.getFollowers());
            foundUser.setFollowing(found.getFollowing());
            foundUser.setComments(found.getComments());
            foundUser.setCreated_at(found.getCreated_at());
            foundUser.setProfilePicture(found.getProfilePicture());
            return foundUser;
        } else {
            return null;
        }



    }

    public List<FollowedUser> getFollowedUsers2(long id) {
        List<Followers> followers = followersRepository.findAllByFollowerId(id);
        return followers.stream()
                .map(Followers::getFollowed)
                .map(user -> new FollowedUser(user.getId(), user.getUsername(), user.getEmail(), user.getProfilePicture(), user.getBio(), user.getCreated_at()))
                .collect(Collectors.toList());
    }


    public List<User> getFollowedUsers(Long userId) {
        List<Followers> followers = followersRepository.findAllByFollowerId(userId);
        List<User> us = new ArrayList<>();
        for (Followers follower : followers) {
            System.out.println(follower.getFollower() + " " + follower.getFollowed());
        }
        return followers.stream().map(Followers::getFollowed).collect(Collectors.toList());
    }

    public List<BlockedUser> getBlockedUsers(Long userId) {
        List<Block> blocks = blockRepository.findAllByBlockerId(userId);
        return blocks.stream().map(Block::getBlocked).map(user -> new BlockedUser(user.getId(), user.getUsername(), user.getProfilePicture(), user.getBio(), user.getCreated_at())).collect(Collectors.toList());
    }

    public void followUser(Long userId, Long userToBeFollowedId) {
        System.out.println(userId + " " + userToBeFollowedId);
        User user = repository.findById(userId).orElse(null);
        User userToFollow = repository.findById(userToBeFollowedId).orElse(null);

        Followers followers = new Followers();
        followers.setFollower(user);
        followers.setFollowed(userToFollow);
        followers.setCreated_at(LocalDateTime.now());
        System.out.println("anyad");
        followersRepository.save(followers);
    }

    public void unblockUser (long userId, long userToBeUnblockedId) {
        blockRepository.delete(userId, userToBeUnblockedId);
    }

    public void blockUser(Long userId, Long authorId) {
        User user = repository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        User author = repository.findById(authorId).orElseThrow(() -> new RuntimeException("Author not found"));

        Block block = new Block();

        block.setBlocker(user);
        block.setBlocked(author);
        block.setCreated_at(LocalDateTime.now());

        blockRepository.save(block);

        user.getBlockedUsers().add(block);
        repository.save(user);
    }

    public List<User> listUsers() {
        return repository.findAll();
    }

}
