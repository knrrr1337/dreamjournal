package mukodjman_backend.model;

import jakarta.persistence.*;
import lombok.*;
import mukodjman_backend.enums.ReactionType;

import java.time.LocalDateTime;

@Entity
@Table(name = "reactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JoinColumn(name = "dream_id", nullable = false)
    private Long dreamId;

    @JoinColumn(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime created_at;
}