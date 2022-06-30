import  React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';
import {getAllCodeService} from "../../services/userService";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../utils";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../store/actions';

class ModalEditUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            previewImgURL: '',
            avatar: '',
            isOpen: false,
            genderArr: [],
            positionArr: [],
            roleArr: [],
            action: '',
            userEditId: ''
        }
    }
    
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        let arrGenders = this.props.genderRedux;
        let arrPositions = this.props.positionRedux;
        let arrRoles = this.props.roleRedux;

        let user = this.props.currentUser;
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id, 
                email: user.email,
                password: 'HARDCODE',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                
                gender: user.gender,
                positionId: arrPositions && arrPositions > 0 ? arrPositions[0].key : '',
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',

                previewImgURL: imageBase64,
                avatar: '',
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux; 
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
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
                //alert('Missing paramater: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handlerSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid == true){
            this.props.editUser(this.state);
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL : objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    render(){
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;

        let {gender, position, role} =this.state;

        
        return(
            <Modal
                isOpen= {this.props.isOpen}
                toggle={() => {this.toggle()}}
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={() => {this.toggle()}}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => {this.handleOnChangeInput(event,'email')}}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                                <input
                                    type="password"
                                    onChange={(event) => {this.handleOnChangeInput(event , "password")}}
                                    value={this.state.password}
                                    disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>First Name</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event , "firstName")}}
                                    value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event , "lastName")}}
                                    value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Address</label>
                                <input
                                    type="text"
                                    onChange={(event) => {this.handleOnChangeInput(event , "address")}}
                                    value={this.state.address}
                            />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                                <select className="form-control" value={gender} onChange={(event) => {this.handleOnChangeInput(event,'gender')}}>
                                    {genders && genders.length > 0 && genders.map((item,index) => {
                                        return(
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                        </div>
                        <div className="input-container">
                            <label>Position</label>
                                <select className="form-control" value={position} onChange={(event) => {this.handleOnChangeInput(event,'position')}}>
                                    {positions && positions.length > 0 && positions.map((item,index) => {
                                        return(
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                                <select className="form-control" value={role} onChange={(event) => {this.handleOnChangeInput(event,'role')}}>
                                    {roles && roles.length > 0 && roles.map((item,index) => {
                                        return(
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )
                                    })}
                                </select>
                        </div>
                        <div className="input-container">
                            <label>Image</label>
                            <div className="preview-img-container">
                                <input id="previewImg" type="file" hidden onChange={(event) => this.handleOnChangeImage(event)}/>
                                <label className="label-upload" htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>
                                <div className="preview-image" style={{backgroundImage: `url(${this.state.previewImgURL})`}} onClick={() => this.openPreviewImage()}>

                                </div>
                            </div>
                        </div>
                        {this.state.isOpen === true && 
                        <Lightbox mainSrc={this.state.previewImgURL} onCloseRequest={() => this.setState({isOpen: false})}

                        />
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => {this.handlerSaveUser()}}
                    >Save changes</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);