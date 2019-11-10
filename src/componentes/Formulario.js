import React from 'react';
import {Icon, Form, Input, Button, Alert, message} from 'antd';

import '../css/icons.css';
import '../css/form.css';

const FormFields = Form.create()(props => {
    const { TextArea } = Input;
    const Search = Input.Search;
    const { getFieldDecorator, getFieldValue, validateFields, getFieldError, resetFields, setFieldsValue} = props.form;   
    
    return ( 
        <Form className="form" layout="horizontal">
            {getFieldError('itemName') || getFieldError('itemMail') || getFieldError('itemAnexo') || getFieldError('itemMensagem')
            ? (
                <Alert
                    className="validateMessage"
                    message="Existem campos obrigatórios para preenchimento."
                    type='error'
                    closable
                />
            ) : ''}
            <Form.Item className="itemName" label="Nome">
                {getFieldDecorator('itemName', {
                    rules: [{ required: true, message: 'Esse campo é obrigatório'}],
                })(<Input id="inputName"/>)}
            </Form.Item>
            <Form.Item className="itemMail" label="E-mail">
                {getFieldDecorator('itemMail', {
                    rules: [
                        { type: 'email', message: 'Insira um e-mail válido!'},
                        { required: true, message: 'Esse campo é obrigatório'}
                    ],
                })(<Input id="inputMail" placeholder="exemple@neoassist.com" />)}
            </Form.Item>
            <Form.Item className="itemCpf" label="CPF">
                <Input id="inputCpf" placeholder="999.999.99-99" />
            </Form.Item>
            <Form.Item className="itemTel" label="Telefone">
                <Input id="inputTel" placeholder="(99) 9999-9999" />
            </Form.Item>
            <Form.Item className="itemAnexo" label="Anexo" for="inputFile">
                <Input id="inputFile" name="inputFile" type="file" style={{ display: 'none' }} 
                onChange={() => {
                    let inputFile = document.getElementById('inputFile');
                    let valueFile = inputFile.value;
                    setFieldsValue({itemAnexo: valueFile});
                }}/>
                {getFieldDecorator('itemAnexo', {
                    rules: [{ required: true, message: 'Esse campo é obrigatório'}],
                    initialValue: ''
                })(
                    <Search
                        readOnly
                        placeholder="Selecione um arquivo"
                        enterButton={<Icon type="plus" />}
                        onSearch={() => {
                            let inputFile = document.getElementById('inputFile');
                            inputFile.click();
                        }}
                    />
                )}
            </Form.Item> 
            <Form.Item className="itemMensagem" label="Mensagem">
                {getFieldDecorator('itemMensagem', {
                    rules: [{ required: true, message: 'Esse campo é obrigatório'}],
                })(<TextArea id="textMessage" rows={4} />)}
            </Form.Item>
            <div className="divRequired">
                <span ><p id="msgRequired">*</p> Campos de preenchimento obrigatório</span>
            </div>
            <Form.Item className="btnSubmit" wrapperCol={{ span: 12, offset: 6 }}>
                <Button 
                    type="primary"
                    htmlType="submit"
                    id="btnForm"
                    onClick={() => {
                        let validateName = getFieldValue('itemName');
                        let validateMail = getFieldValue('itemMail');
                        let validateAnexo = getFieldValue('itemAnexo');
                        let validateMessage = getFieldValue('itemMensagem');

                        if(validateName === undefined || validateMail === undefined || validateAnexo === undefined  || validateMessage === undefined){
                            validateFields();                   
                        } else {
                            resetFields();
                            message.success('Mensagem enviada com sucesso!', 2);
                        }
                    }}
                >
                    Enviar
                </Button>
            </Form.Item>
        </Form>
    );
});

export default class Formulario extends React.Component {
    constructor(props) {
        super(props);
    }

    renderForm(){
        return (
            <FormFields />
        )
    }

    render(){
        return (
            <div className="container">
                <div className="borderTop">
                    <div id="containerTop">
                        <div className="top">
                            <div id="iconTop">
                                <Icon id="iconMail" type="mail"/>
                            </div>
                            <div id="topTitle">
                                <span id="title">Atendimento via E-mail</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="contentForm">
                    <span id="infoForm">Preencha os campos e envie-nos sua mensagem:</span>
                    {this.renderForm()}
                    <div className="logo">
                        <img id="imgLogo" src="https://e-millennium.com.br/wp-content/uploads/2017/03/neoassist2019.png"/>
                    </div>
                </div>
            </div>
        )
    }
}
