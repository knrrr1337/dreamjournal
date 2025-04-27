package mukodjman_backend.converter;

import mukodjman_backend.dto.user.UserRead;
import mukodjman_backend.model.User;

public class UserConverter {

    public static UserRead convertModelToRead(User user) {
        UserRead userRead = new UserRead();
        userRead.setId(user.getId());
        userRead.setUsername(user.getUsername());
        userRead.setEmail(user.getEmail());
        userRead.setPassword(user.getPassword());
        userRead.setProfilePicture(user.getProfilePicture());
        userRead.setBio(user.getBio());
        userRead.setCreated_at(user.getCreated_at());
        userRead.setDreams(user.getDreams());
        userRead.setFollowers(user.getFollowers());
        userRead.setFollowing(user.getFollowing());
        userRead.setComments(user.getComments());
        userRead.setReactions(user.getReactions());
        userRead.setBlockedUsers(user.getBlockedUsers());

        return userRead;
    }

}
