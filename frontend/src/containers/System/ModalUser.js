
import  React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from "../../utils/emitter";

class ModalUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',

        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState( {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        } )
    })
}

    componentDidMount() {
        
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {

        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = [ 'email', 'firstName', 'lastName', 'address'];
        for (let i=0; i < arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);