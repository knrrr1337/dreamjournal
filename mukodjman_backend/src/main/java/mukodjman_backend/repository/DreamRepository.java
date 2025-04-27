package mukodjman_backend.repository;

import jakarta.transaction.Transactional;
import mukodjman_backend.model.Dream;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface DreamRepository extends JpaRepository<Dream, Long> {

    List<Dream> findAllByUserId(long userId);
    List<Dream> findAllByIdIn(List<Long> ids);

    @Modifying
    @Transactional
    @Query("DELETE FROM Dream d WHERE d.id = :id")
    void delete(@Param("id") long id);

    @Modifying
    @Transactional
    @Query("UPDATE Dream d SET d.title = :title, d.content = :content, d.tags = :tags WHERE d.id = :dreamId")
    void editDream(@Param("dreamId") long id, @Param("title") String title, @Param("content") String content, @Param("tags") String tags);

    @Query("SELECT d.tags FROM Dream d WHERE d.created_at BETWEEN :lastweek AND :now")
    List<String> findLastWeek(@Param("lastweek") LocalDateTime lastweek, @Param("now") LocalDateTime now );

    @Query("SELECT d.tags FROM Dream d")
    List<String> findAllTags();

    @Query("SELECT d FROM Dream d WHERE " + "(:tag1 IS NULL OR d.tags LIKE %:tag1%) " + "AND (:tag2 IS NULL OR d.tags LIKE %:tag2%) " + "AND (:tag3 IS NULL OR d.tags LIKE %:tag3%) AND d.created_at BETWEEN :lastweek AND :now")
    List<Dream> findTrendingPostsByTag(@Param("lastweek") LocalDateTime lastweek, @Param("now") LocalDateTime now, @Param("tag1") String tag, @Param("tag2") String tag2, @Param("tag3") String tag3);

//    @Query("SELECT d FROM Dream d WHERE d.tags LIKE %:tag%")
    @Query("SELECT d FROM Dream d WHERE " + "(:tag1 IS NULL OR d.tags LIKE %:tag1%) " + "AND (:tag2 IS NULL OR d.tags LIKE %:tag2%) " + "AND (:tag3 IS NULL OR d.tags LIKE %:tag3%)")
    List<Dream> findAllPostsByTag(@Param("tag1") String tag1, @Param("tag2") String tag2, @Param("tag3") String tag3);
}

