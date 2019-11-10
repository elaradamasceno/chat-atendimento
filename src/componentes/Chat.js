import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';

import '../css/icons.css';
import '../css/chat.css';

const ChatFields = Form.create()(props => {
    const { getFieldDecorator, getFieldValue, validateFields, resetFields} = props.form;
    return ( 
        <Form layout="horizontal" className="formChat">
            <Form.Item label="Nome">
                {getFieldDecorator('nameChat', {
                    rules: [{ required: true, message: 'Esse campo é obrigatório'}],
                })(<Input id="nameChat" />)}
            </Form.Item>
            <Form.Item label="E-mail">
                {getFieldDecorator('mailChat', {
                    rules: [
                        { type: 'email', message: 'Insira um e-mail válido!'},
                        { required: true, message: 'Esse campo é obrigatório.'}
                    ],
                    
                })(<Input id="mailChat" placeholder="exemple@neoassist.com" />)}
            </Form.Item>
            <Form.Item label="CPF">
                <Input id="cpfChat" />
            </Form.Item>
            <Form.Item label="Telefone">
               <Input id="telChat" />
            </Form.Item>
            <Form.Item className="btnSubmitChat" wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" htmlType="submit" onClick={() => {
                    let validateName = getFieldValue('nameChat');
                    let validateMail = getFieldValue('mailChat');

                    if(validateName === undefined || validateMail === undefined)
                        validateFields();    
                    else {
                        resetFields();
                        message.success('Mensagem enviada com sucesso!');
                    }                    
                }}>
                    Enviar
                </Button>
            </Form.Item>
        </Form>
    );
});

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { visible: false };
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };    

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    renderFields(){
        return (
            <ChatFields onChange={this.handleFormChange} />
        )
    }

    render() {
        return (
            <div>
                <Button className="btnChat" size={'large'} shape="circle" icon="message" type="primary" onClick={this.showModal}></Button>
                <Modal
                    visible={this.state.visible}
                    title="Atendimento Online"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button id="btnCloseModal" key="back" onClick={this.handleCancel}> Cancelar </Button>
                    ]}
                    >
                        {this.renderFields()}
                </Modal>
            </div>
        );
    }
}