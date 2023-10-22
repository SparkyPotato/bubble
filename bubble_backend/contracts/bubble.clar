(define-map users { user: principal } { nickname: (string-utf8 50) })
(define-map threads { id: uint } { title: (string-utf8 100), posts: uint })
(define-map posts { thread: uint, id: uint } { author: principal, content: (string-utf8 250) })

(define-data-var thread-counter uint u0)

(define-public (set-nickname (nickname (string-utf8 50)))
    (begin
        (map-set users {user: tx-sender} {nickname: nickname})
        (ok nickname)
    )
)

(define-public (start-thread (title (string-utf8 100)) (content (string-utf8 250)))
    (let ((thread-id (var-get thread-counter)))
    (begin
        (map-insert threads { id: thread-id } { title: title, posts: u0 })
        (var-set thread-counter (+ thread-id u1))
        (try! (post-reply thread-id content))
        (ok thread-id)
    )
    )
)

(define-public (post-reply (thread-id uint) (content (string-utf8 250)))
    (let ((thread (unwrap! (map-get? threads { id: thread-id }) (err "Thread does not exist"))))
    (let ((post-id (get posts thread)))
    (begin
        (map-insert posts { thread: thread-id, id: post-id } { author: tx-sender, content: content })
        (map-set threads { id: thread-id } { title: (get title thread), posts: (+ post-id u1) })
        (ok post-id)
    )
    ))
)

(define-read-only (get-nickname (user principal))
    (let ((name (try! (map-get? users { user: user }))))
    (some (get nickname name))
    )
)

(define-read-only (get-thread-count)
    (var-get thread-counter)
)

(define-read-only (get-thread (id uint))
    (map-get? threads { id: id })
)

(define-read-only (get-post (thread uint) (post_id uint))
    (begin
        (let ((post (try! (map-get? posts { thread: thread, id: post_id }))))
        (let ((author (get author post)))
        (let ((content (get content post)))
        (some { username: (try! (get-nickname author)), content: content })
        )))
    )
)
