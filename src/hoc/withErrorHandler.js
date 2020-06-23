/* eslint-disable react/no-deprecated */
/* eslint-disable react/display-name */
import React, { Component } from 'react';
import Modal from '../components/UI/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error });
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorComfirmedHanlder = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <div>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorComfirmedHanlder}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </div>
            );
        }
    };
};

export default withErrorHandler;