// import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import './UserManage.scss';
// import { getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
// import ModalUser from './ModalUser';
// import ModalEdiUser from './ModalEditUser';
// import {emitter} from "../../utils/emitter";

// class UserManage extends Component {

//     constructor(props){
//         super(props);
//             this.state = {
//                 arrUsers: [],
//                 isOpenModalUser: false,
//                 isOpenModalEditUser: false,
//                 userEdit: {}
//         }
//     }

//     async componentDidMount(){
//         await this.getAllUsersFromReact();
//     }

//    getAllUsersFromReact = async() => {
//     let response = await getAllUsers('ALL');
//     if (response && response.errCode === 0){
//         this.setState({
//             arrUsers: response.users
//         })
//     } 
//    }

   

//    toggleUserModal = () => {
//     this.setState({
//         isOpenModalUser: !this.state.isOpenModalUser,
//     })
//    }

//    toggleUserEditModal = () => {
//     this.setState({
//         isOpenModalEditUser : !this.state.isOpenModalEditUser,
//     })
//    }
  

//    handleDeleteUser = async (user) => {
//     console.log('click delete', user)
//     try {
//         let res = await deleteUserService(user.id);
//         if (res && res.errCode === 0){
//             await this.getAllUsersFromReact();
//         }else{
//             alert(res.errMessage)
//         }
//     }catch(e){
//         console.log(e);
//     }
//    }


//    handleEditUser = (user) => {
//     console.log('check edit user', user);
//     this.setState({
//         isOpenModalEditUser: true,
//         userEdit: user
//     })
//    }

//    doEditUser = async(user) => {
//     try{ 
//         let res = await editUserService(user);
//         if(res && res.errCode === 0 ){
//             this.setState({
//                 isOpenModalEditUser: false
//             })
//            await this.getAllUsersFromReact()
//         }else{
//             alert(res.errCode)
//         }
//     }catch(e){
//     console.log(e)
//     }
//    }

   
//     render(){
//         let arrUsers = this.state.arrUsers;
//         console.log(arrUsers)
//         return(
//             <div className='users-container'>
//                 <ModalUser
//                 isOpen={this.state.isOpenModalUser}
//                 toggleFormParent= {this.toggleUserModal}
//                 createNewuser={this.createNewuser}
//                 />
//                 <ModalEdiUser
//                 isOpen={this.state.isOpenModalEditUser}
//                 toggleFormParent= {this.toggleUserEditModal}
//                 currentUser = {this.state.userEdit}
//                 editUser={this.doEditUser}
//                 />
//                 <div className= "title text-center"> Manage users with Eric</div>
                
//                 <div className="users-table mt-3 mx-1">
//                     <table id = "customers">
//                         <tbody>
//                             <tr>
//                                 <th>Email</th>
//                                 <th>First name</th>
//                                 <th>Last name</th>
//                                 <th>Address</th>
//                                 <th>Actions</th>
//                             </tr>

//                             {arrUsers && arrUsers.map((item, index) => {
//                                 return(
//                                     <tr key={index}>
//                                         <td>{item.email}</td>
//                                         <td>{item.firstName}</td>
//                                         <td>{item.lastName}</td>
//                                         <td>{item.address}</td>
//                                         <td>
//                                             <button className="btn-edit" onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
//                                             <button className="btn-delete" onClick= {() => this.handleDeleteUser(item) }><i className="fas fa-trash"></i></button>
//                                         </td>

//                                     </tr>

//                                 )
//                             })
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
