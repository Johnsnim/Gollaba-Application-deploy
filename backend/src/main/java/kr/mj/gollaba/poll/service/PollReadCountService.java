package kr.mj.gollaba.poll.service;

import kr.mj.gollaba.common.Scheduler;
import kr.mj.gollaba.poll.entity.redis.PollReadCount;
import kr.mj.gollaba.poll.repository.PollReadCountRepository;
import kr.mj.gollaba.poll.repository.PollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class PollReadCountService {
    private final PollRepository pollRepository;
    private final PollReadCountRepository pollReadCountRepository;

    @Transactional
    public void saveReadCount() {
        var pollReadCounts = pollReadCountRepository.findAll();
        var pollReadCountByPollId = StreamSupport.stream(pollReadCounts.spliterator(), false)
            .collect(Collectors.toMap(prc -> prc.getPollId(), prc -> prc));

        var polls = pollRepository.findAllById(pollReadCountByPollId.keySet());

        for (var poll : polls) {
            var pollReadCount = pollReadCountByPollId.get(poll.getId());
            poll.updateReadCount(pollReadCount.getReadCount());
            pollRepository.save(poll);
        }
    }
}