package mukodjman_backend.service;

import mukodjman_backend.enums.Privacy;
import mukodjman_backend.model.*;
import mukodjman_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DreamService {

    @Autowired
    private FollowersRepository followersRepository;

    @Autowired
    private DreamRepository dreamRepository;

    @Autowired
    private BlockRepository blockRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ReactionRepository reactionRepository;

    @Autowired
    private DreamImageRepository dreamImageRepository;

    public List<String> getTrendingTags() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime week = now.minusDays(7);
        List<String> lastweek = dreamRepository.findLastWeek(week, now);

        HashSet<String> tags = new HashSet<>();
        ArrayList<String> tagsArray = new ArrayList<>();
        for (String s : lastweek) {
            tagsArray.add(s);
            if (s != null && !s.isEmpty()) {
                String[] tagsSplit = s.split("#");
                tags.addAll(Arrays.asList(tagsSplit));
            }
        }

        Map<String, Integer> tagsDictionary = new HashMap<>();

        for (String tag : tags) {
            tagsDictionary.put(tag, Collections.frequency(tagsArray, tag));
        }

        // Sort the dictionary by values in descending order and limit to top 3
        List<Map.Entry<String, Integer>> sortedTags = new ArrayList<>(tagsDictionary.entrySet());
        sortedTags.sort((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));

        List<String> topTags = new ArrayList<>();
        for (int i = 0; i < Math.min(3, sortedTags.size()); i++) {
            Map.Entry<String, Integer> entry = sortedTags.get(i);
            topTags.add(entry.getKey());
            System.out.println("Tag: " + entry.getKey() + ", Frequency: " + entry.getValue());
        }

        return topTags;

    }

    public List<String> getAllTimeTags() {
        List<String> lastweek = dreamRepository.findAllTags();

        HashSet<String> tags = new HashSet<>();
        ArrayList<String> tagsArray = new ArrayList<>();
        for (String s : lastweek) {
            tagsArray.add(s);
            if (s != null && !s.isEmpty()) {
                String[] tagsSplit = s.split("#");
                tags.addAll(Arrays.asList(tagsSplit));
            }
        }

        Map<String, Integer> tagsDictionary = new HashMap<>();

        for (String tag : tags) {
            tagsDictionary.put(tag, Collections.frequency(tagsArray, tag));
        }

        // Sort the dictionary by values in descending order and limit to top 3
        List<Map.Entry<String, Integer>> sortedTags = new ArrayList<>(tagsDictionary.entrySet());
        sortedTags.sort((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));

        List<String> topTags = new ArrayList<>();
        for (int i = 0; i < Math.min(3, sortedTags.size()); i++) {
            Map.Entry<String, Integer> entry = sortedTags.get(i);
            topTags.add(entry.getKey());
            System.out.println("Tag: " + entry.getKey() + ", Frequency: " + entry.getValue());
        }

        return topTags;
    }

    public List<Dream> getTrendingPostsByTag(String tag) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime week = now.minusDays(7);

        String[] tags = tag.split("-");
        String tag1 = tags.length > 0 ? tags[0] : null;
        String tag2 = tags.length > 1 ? tags[1] : null;
        String tag3 = tags.length > 2 ? tags[2] : null;
        return dreamRepository.findTrendingPostsByTag(week, now, tag1, tag2, tag3);
    }

    public List<Dream> getAllPostsByTag(String tag) {
        String[] tags = tag.split("-");
        String tag1 = tags.length > 0 ? tags[0] : null;
        String tag2 = tags.length > 1 ? tags[1] : null;
        String tag3 = tags.length > 2 ? tags[2] : null;

        return dreamRepository.findAllPostsByTag(tag1, tag2, tag3);
    }

    public Dream getDreamById(long id) {
        return dreamRepository.findById(id).get();
    }

    public List<Dream> getUserDreams(long id) {
        return dreamRepository.findAllByUserId(id);
    }

//    public void createDream(long userId, String title, String content, Privacy privacy) {
//        Dream dream = new Dream();
//        User user = usersRepository.findById(userId).get();
//        dream.setUser(user);
//        dream.setTitle(title);
//        dream.setContent(content);
//        dream.setPrivacy(privacy);
//        List<Reaction> reactions = new ArrayList<>();
//        List<Comment> comments = new ArrayList<>();
//        List<DreamImage> images = new ArrayList<>();
//        dream.setReactions(reactions);
//        dream.setComments(comments);
//        dream.setCreated_at(LocalDateTime.now());
//        dreamRepository.save(dream);
//    }

    public void createDream(Long userId, String title, String content, Privacy privacy, List<String> imageUrls, List<String> tags) {
        User user = usersRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Dream dream = new Dream();
        dream.setUser(user);
        dream.setTitle(title);
        dream.setContent(content);
        dream.setPrivacy(privacy);
        String taga = "";
        for (int i = 0; i < tags.size(); i++) {
            if (i != tags.size() - 1) {
                taga += tags.get(i) + "#";
            } else {
                taga += tags.get(i);
            }
        }
        dream.setTags(taga);
//        dream.setCreated_at(LocalDateTime.now());
        dream.setCreated_at(LocalDateTime.of(2025, 3, 2, 15, 32, 12));
        Dream savedDream = dreamRepository.save(dream);

        // Save images
        if (imageUrls != null && !imageUrls.isEmpty()) {
            for (int i = 0; i < imageUrls.size(); i++) {
                DreamImage dreamImage = new DreamImage();
                dreamImage.setDreamId(savedDream.getId());
                dreamImage.setImageUrl(imageUrls.get(i));
                dreamImage.setImageOrder(i);
                dreamImageRepository.save(dreamImage);
            }
        }
    }

    public void editDream(Long id, String title, String content, List<String> images, List<String> tags) {
        if (images != null) {
            for (String image : images) {
                System.out.println(image);
                dreamImageRepository.deleteByImageUrl(image);
            }
        }

        String taggs = "";
        for (int i = 0; i < tags.size(); i++) {
            if (i == tags.size() - 1) {
                taggs += tags.get(i);
            } else {
                taggs += tags.get(i) + "#";
            }
        }

        dreamRepository.editDream(id, title, content, taggs);
    }

    public void likePost(long postId, long userId) {
        Reaction reaction = new Reaction();
        reaction.setUserId(userId);
        reaction.setDreamId(postId);
        reaction.setCreated_at(LocalDateTime.now());
        reactionRepository.save(reaction);
    }

    public void deleteDream(long id) {
        dreamRepository.delete(id);
    }

    public List<Dream> getAllFollowedUsersDreams(Long userId) {
        List<Followers> followers = followersRepository.findAllByFollowerId(userId);
        List<Long> followedUserIds = followers.stream().map(follower -> follower.getFollowed().getId()).collect(Collectors.toList());
        List<Block> blocks = blockRepository.findAllByBlockerId(userId);
        List<Long> blockedUserIds = blocks.stream().map(block -> block.getBlocked().getId()).collect(Collectors.toList());

        List<Dream> asd = dreamRepository.findAll();

        for (Dream dream : asd) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            List<DreamImage> images = dreamImageRepository.findAllByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
            dream.setImages(images);
        }
        return asd.stream()
                .filter(dream -> followedUserIds.contains(dream.getUser().getId()) && !blockedUserIds.contains(dream.getUser().getId()))
                .collect(Collectors.toList());
    }

    public void removeLikePost(Long postId, Long userId) {
        reactionRepository.removeLike(userId, postId);
    }

    public List<Dream> getLikedDreams(Long userId) {
        List<Long> reactions = reactionRepository.findDreamIdsByUserId(userId);
        return dreamRepository.findAllByIdIn(reactions);
//        for (Long reaction : reactions) {
//            System.out.println(reaction + " )))");
//        }

    }

    public List<Dream> getAllDreamsForUser(Long userId) {
        List<Block> blocks = blockRepository.findAllByBlockerId(userId);
        List<Long> blockedUserIds = blocks.stream().map(block -> block.getBlocked().getId()).collect(Collectors.toList());
        List<Dream> asd = dreamRepository.findAll();

        for (Dream dream : asd) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
        }
        return asd.stream()
                .filter(dream -> !blockedUserIds.contains(dream.getUser().getId()))
                .collect(Collectors.toList());
    }

    public List<Dream> getAllDreams(long id) {
        List<Followers> followers = followersRepository.findAllByFollowerId(id);
        List<Block> blocks = blockRepository.findAllByBlockerId(id);
        List<Long> blockedUserIds = blocks.stream().map(block -> block.getBlocked().getId()).collect(Collectors.toList());
        List<Long> followedUserIds = followers.stream()
                .map(f -> f.getFollowed().getId())
                .collect(Collectors.toList());

        // Retrieve all dreams and filter them according to privacy rules.
        List<Dream> dreams = dreamRepository.findAll().stream()
                .filter(dream ->
                        (dream.getUser().getId() == id ||
                                dream.getPrivacy() == Privacy.PUBLIC ||
                                (dream.getPrivacy() == Privacy.FOLLOWERS_ONLY && followedUserIds.contains(dream.getUser().getId()))) && !blockedUserIds.contains(dream.getUser().getId())
                )
                .collect(Collectors.toList());

        // Populate comments, reactions, and images for each dream.
        for (Dream dream : dreams) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            List<DreamImage> images = dreamImageRepository.findAllByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
            dream.setImages(images);
        }
        return dreams;
    }

//    public List<Dream> getAllDreams(long id) {
////        List<Dream> dreams = dreamRepository.findAll();
////        List<Followers> followers = followersRepository.findAllByFollowerId(id);
////        for (Dream dream : dreams) {
////            if (dream.getUser().getId() != id && dream.getPrivacy() == Privacy.PRIVATE) {
////                dreams.remove(dream);
////            }
////        }
////        return dreams;
//
//        List<Followers> followers = followersRepository.findAllByFollowerId(id);
//        List<Long> followedUserIds = followers.stream()
//                .map(f -> f.getFollowed().getId())
//                .collect(Collectors.toList());
//
//        // Retrieve all dreams and filter them according to privacy rules:
//        // - Include if dream privacy is PUBLIC
//        // - If privacy is FOLLOWERS_ONLY, include only if the current user follows the dream's poster.
//        return dreamRepository.findAll().stream()
//                .filter(dream ->
//                        dream.getUser().getId() == id ||
//                        dream.getPrivacy() == Privacy.PUBLIC ||
//                                (dream.getPrivacy() == Privacy.FOLLOWERS_ONLY && followedUserIds.contains(dream.getUser().getId()))
//                )
//                .collect(Collectors.toList());
//
//    }

    public List<Dream> getAllBlockedUsersDreams(Long userId) {
        List<Block> blocks = blockRepository.findAllByBlockerId(userId);
        List<Long> blockedUserIds = blocks.stream().map(block -> block.getBlocked().getId()).collect(Collectors.toList());
        List<Dream> asd = dreamRepository.findAll();

        for (Dream dream : asd) {
            List<Comment> comments = commentRepository.findByDreamId(dream.getId());
            List<Reaction> reactions = reactionRepository.findByDreamId(dream.getId());
            dream.setComments(comments);
            dream.setReactions(reactions);
        }

        return asd.stream()
                .filter(dream -> blockedUserIds.contains(dream.getUser().getId()))
                .collect(Collectors.toList());
    }
}