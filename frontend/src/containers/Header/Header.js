import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import './Header.scss';
import {LANGUAGES, USER_ROLE} from '../../utils';
import { FormattedMessage } from 'react-intl';
import { adminMenu, doctorMenu} from'./menuApp';
import _ from 'lodash';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount(){
        let {adminInfo} = this.props;
        let menu = [];
        if(adminInfo && !_.isEmpty(adminInfo)){
            let role = adminInfo.roleId;
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu;
            }
            if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, adminInfo, language } = this.props;
        console.log('check adminInfo: ',adminInfo);
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div>
                    {/* welcome Admin */}
                    <span className='welcome'><FormattedMessage id="menu.admin.welcome"/>, 
                    {adminInfo && adminInfo.firstName ? adminInfo.firstName : ''}!</span>
                    {/* change language */}
                    <span className={language == LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={language == LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        adminInfo: state.admin.adminInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
