import { dto } from './dto.js';
import { card } from './card.js';
import { like } from './like.js';
import { util } from './util.js';
import { theme } from './theme.js';
import { session } from './session.js';
import { storage } from './storage.js';
import { pagination } from './pagination.js';
import { request, HTTP_GET, HTTP_POST, HTTP_DELETE, HTTP_PUT } from './request.js';

export const comment = (() => {
    let owns = null;
    let user = null;
    let tracker = null;
    let showHide = null;

    // Fungsi resetComments untuk menghapus semua komentar dari DOM
    const resetComments = () => {
        const commentsContainer = document.getElementById('comments');
        if (commentsContainer) {
            while (commentsContainer.firstChild) {
                commentsContainer.removeChild(commentsContainer.firstChild);
            }
            console.log('All comments have been removed from the DOM.');
        }
    };

    const changeButton = (id, disabled) => {
        const buttonMethod = ['reply', 'edit', 'remove'];

        buttonMethod.forEach((v) => {
            const status = document.querySelector(`[onclick="comment.${v}(this)"][data-uuid="${id}"]`);
            if (status) {
                status.disabled = disabled;
            }
        });
    };

    const send = async (button) => {
        const id = button.getAttribute('data-uuid');

        const form = document.getElementById(`form-${id ? `inner-${id}` : 'comment'}`);
        const commentText = form.value.trim(); // Ambil teks dari input

        // Tambahkan logika untuk mendeteksi perintah "resetcomment"
        if (commentText.toLowerCase() === 'resetcomment') {
            resetComments(); // Panggil fungsi resetComments
            alert('All comments have been reset.');
            form.value = ''; // Kosongkan input form
            return; // Hentikan proses pengiriman
        }

        form.disabled = true;
        const btn = util.disableButton(button);

        const response = await request(HTTP_POST, '/api/comment')
            .token(session.getToken())
            .body(dto.postCommentRequest(id, null, true, commentText))
            .send(dto.postCommentResponse)
            .then((res) => res, () => null);

        form.disabled = false;
        btn.restore();

        if (!response || response.code !== 201) {
            return;
        }

        owns.set(response.data.uuid, response.data.own);
        form.value = null;

        // Tambahkan komentar baru ke DOM
        const commentsContainer = document.getElementById('comments');
        const newComment = document.createElement('div');
        newComment.innerHTML = card.renderContent(response.data);
        commentsContainer.insertBefore(newComment, commentsContainer.firstChild);
    };

    // Fungsi lain tetap sama, tanpa modifikasi
    const remove = async (button) => { /* ... */ };
    const update = async (button) => { /* ... */ };
    const cancel = (id) => { /* ... */ };
    const reply = (button) => { /* ... */ };
    const edit = async (button) => { /* ... */ };
    const comment = () => { /* ... */ };
    const showOrHide = (button) => { /* ... */ };
    const fetchTracker = (comment) => { /* ... */ };
    const scroll = () => document.getElementById('comments').scrollIntoView({ behavior: 'smooth' });

    const init = () => {
        like.init();
        card.init();

        owns = storage('owns');
        user = storage('user');
        tracker = storage('tracker');
        showHide = storage('comment');
    };

    return {
        init,
        scroll,
        cancel,
        send,
        edit,
        reply,
        remove,
        update,
        comment,
        showOrHide,
    };
})();
