import React, { Component, Route } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, deleteUserService, editUserService} from '../../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {emitter} from "../../utils/emitter";
import ModalEditUser from './ModalEditUser';


class UserManage extends Component {
    constructor(props){
        super(props);
        this.state ={
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount(){
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async() => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
        } 
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser : !this.state.isOpenModalEditUser,
        })
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0){
                await this.getAllUsersFromReact();
            }else{
                alert(res.errMessage)
            }
        }catch(e){
            console.log(e);
        }
    }
    
    handleEditUser = (user) => {
        //console.log('check edit user: ',user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    
    doEditUser = async(user) => {
        try{ 
            let res = await editUserService(user);
            if(res && res.errCode === 0 ){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }else{
                alert(res.errCode)
            }
        }catch(e){
            console.log(e)
        }
    }
    
    render(){
        let arrUsers = this.state.arrUsers;
        return (
            <div className= "users-container">
                {
                    this.state.isOpenModalEditUser && 
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent= {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }                
                <div className='title text -center'><FormattedMessage id="manage-user.manage-users"/></div>
                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th><FormattedMessage id="manage-user.email"/></th>
                            <th><FormattedMessage id="manage-user.firstName"/></th>
                            <th><FormattedMessage id="manage-user.lastName"/></th>
                            <th><FormattedMessage id="manage-user.address"/></th>
                            <th><FormattedMessage id="manage-user.address"/></th>
                        </tr>
                        {arrUsers && arrUsers.map((item, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                    
                                        <button className="btn-delete" onClick= {() => this.handleDeleteUser(item) }><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return{

    };
}; 

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
