import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo3.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from '../../store/actions';
import ReactCountryFlag from "react-country-flag";
import { withRouter } from "react-router";

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () => {
        if (this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>                        
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm bác sĩ' className='input-search'></input>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='flag'>
                                <ReactCountryFlag
                                        countryCode="VN"
                                        svg
                                        style={{
                                            width: '1.5em',
                                            height: '1.5em',
                                        }}
                                        title="VN"
                                />
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} style={{paddingRight: "40px"}}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            </div>
                            <div className='flag'>
                                <ReactCountryFlag
                                    countryCode="US"
                                    svg
                                    style={{
                                        width: '1.5em',
                                        height: '1.5em',
                                    }}
                                    title="US"
                                />
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='title1'><FormattedMessage id="banner.title1"/></div>
                        <div className='title2'><FormattedMessage id="banner.title2"/></div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
