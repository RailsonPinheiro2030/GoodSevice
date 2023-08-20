import { Modal, Button } from "rsuite";


const ModalComponent = (props) =>{


    return(
        <Modal open={props.open} onClose={()=>props.setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Schedule Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {props.children}
        </Modal.Body>
        
      </Modal>
    )
}
export default ModalComponent