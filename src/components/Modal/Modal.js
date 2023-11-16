function Modal({ show, message }) {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="alert alert-success" role="alert">
                        <i className="fa-solid fa-circle-check" style={{ color: '#1cc819' }}></i> {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;