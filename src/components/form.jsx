const Reflux = require('reflux')
const request = require('ajax-request')
const UUID = require('uuid')

function Form() {
  const id = UUID.v4()

  const FormActions = Reflux.createActions([
    'setFieldCount',
    'submitForm',
    'setInvalidField',
    'setValidField',
    'checkIfDoneValidating',
    'doneValidating',
    'enableForm',
    'disableForm',
    'formSuccess',
  ])

  const FormStore = Reflux.createStore({
    listenables: [FormActions],
    data: {
      fieldCount: 0,
      invalidFields: [],
      validFields: [],
    },
    init: function() {},
    setFieldCount: function(count) {
      this.data.fieldCount = count
    },
    submitForm: function() {
      this.disableForm()
      this.data.validFields = []
      this.data.invalidFields = []
      this.trigger({
        action: 'submit'
      })
    },
    setInvalidField: function(field) {
      this.data.invalidFields.push(field)
      this.checkIfDoneValidating()
    },
    setValidField: function(field) {
      this.data.validFields.push(field)
      this.checkIfDoneValidating()
    },
    checkIfDoneValidating: function() {
      const totalFields = this.data.fieldCount
      const checkedFields = this.data.invalidFields.length + this.data.validFields.length
      const validationComplete = totalFields === checkedFields
      if (validationComplete) FormActions.doneValidating()
    },
    doneValidating: function() {
      this.trigger({
        action: 'done validating',
        invalid: this.data.invalidFields,
        valid: this.data.validFields,
      })
    },
    enableForm: function() {
      this.trigger({
        action: 'enable form'
      })
    },
    disableForm: function() {
      this.trigger({
        action: 'disable form'
      })
    },
    formSuccess: function() {
      this.trigger({
        action: 'form success'
      })
    }
  })

  const FormMsg = React.createClass({
    getDefaultProps: function() {
      return {
        big: false,
        center: false
      }
    },
    getStyle: function() {
      var style = {
        display: 'none',
        margin: '0',
        fontSize: this.props.big ? '1rem' : '0.8rem',
      }
      if (this.props.center) {
        style.margin = '0 auto'
      }
      switch (this.props.message.type) {
        case 'success':
          style.display = 'block'
          style.color = 'green'
          break
        case 'error':
          style.display = 'block'
          style.color = 'red'
          break
      }
      return style
    },
    render: function() {
      return <p style={this.getStyle()}>{this.props.message.text}</p>
    }
  })

  const FormField = React.createClass({
    getDefaultProps: function() {
      return {
        field: {
          hideOnSuccess: false
        }
      }
    },
    getInitialState: function() {
      return {
        isDisabled: false,
        message: {
          type: '',
          text: ''
        },
        style: {
          display: 'block'
        }
      }
    },
    componentWillMount: function() {
      FormStore.listen(this.onFormAction)
    },
    onFormAction: function(data) {
      switch (data.action) {
        case 'submit':
          this.validate()
          break
        case 'disable form':
          this.setState({ isDisabled: true })
          break
        case 'enable form':
          this.setState({ isDisabled: false })
          break
        case 'form success':
          if (this.props.field.hideOnSuccess) {
            this.setState({
              style: { display: 'none' }
            })
          }
          break
      }
    },
    clearMessage: function() {
      this.setState({ message: {} })
    },
    getValue: function() {
      var value = null
      const field = this.props.field
      switch (field.type) {
        case 'text':
        case 'textarea':
          value = this.refs[field.name].value
      }
      return value
    },
    validate: function() {
      const field = this.props.field
      if (!field.name) return

      const value = this.getValue()

      // Check if required
      if (field.isRequired) {
        if (value.length === 0) {

          // Add error to store
          FormActions.setInvalidField({
            name: field.name,
            value: value
          })

          // Display error message
          return this.setState({
            message: {
              type: 'error',
              text: field.name.substr(0,1).toUpperCase() + field.name.substr(1).toLowerCase() + ' is required.',
            }
          })
        }
      }

      // Check custom validations
      var regex = null
      switch (field.validation) {
        case 'email':
          regex = new RegExp(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)
          if (!regex.exec(value)) {

            // Add error to store
            FormActions.setInvalidField({
              name: field.name,
              value: value
            })

            // Display error message
            return this.setState({
              message: {
                type: 'error',
                text: 'Please enter a valid email address.',
              }
            })
          }
          break

        case 'zip':
          regex = new RegExp(/^\d{5}$/)
          break

        case 'password':
          // check for password requirements
          // - 1 special character
          // - 1 uppercase
          // - 1 lowercase
          break
      }

      // Let our store know we've validated this field
      FormActions.setValidField({
        name: field.name,
        value: value
      })
    },
    render: function() {
      return (
        <div className={'field ' + this.props.field.grid} style={this.state.style}>
          {this.renderFormElement()}
          {this.renderFormMessage()}
        </div>
      )
    },
    renderFormElement: function() {
      const field = this.props.field
      switch (field.type) {
        case 'text':
          return <input ref={field.name} name={field.name} type='text' placeholder={field.placeholder} disabled={this.state.isDisabled} maxLength={field.maxLength} onFocus={this.clearMessage} onChange={this.clearMessage} />
        case 'textarea':
          return <textarea ref={field.name} name={field.name} placeholder={field.placeholder} disabled={this.state.isDisabled} maxLength={field.maxLength} onFocus={this.clearMessage} onChange={this.clearMessage} />
        case 'submit':
          return <input type='submit' disabled={this.state.isDisabled} value={field.text} />
      }
    },
    renderFormMessage: function() {
      if (this.props.field.name) {
        return <FormMsg message={this.state.message} />
      }
    }
  })

  return React.createClass({
    mixins: [Reflux.connect(FormStore, 'form-' + id)],
    getInitialState: function() {
      return {
        isDisabled: false,
        message: {
          type: '',
          text: ''
        }
      }
    },
    getFieldCount: function() {
      return (
        this.props.fields.map(function(field) {
          return field.name ? field.name : null
        }).filter((function(v) { return v !== null }))
      ).length
    },
    componentWillMount: function() {
      FormStore.listen(this.onFormAction)
      FormActions.setFieldCount(this.getFieldCount())
    },
    onFormAction: function(data) {
      switch (data.action) {
        case 'done validating': this.onValidationComplete(data)
      }
    },
    submit: function(e) {
      e.preventDefault()
      FormActions.submitForm()
    },
    onValidationComplete: function(data) {
      if (data.invalid.length === 0) this.success(data.valid)
      else this.error()
    },
    error: function() {
      this.props.error('Form has errors.')
      FormActions.enableForm()
    },
    success: function(fields) {
      const _this = this

      // Create POST object
      var POST = {}
      fields.map(function(field) {
        POST[field.name] = field.value
      })

      // Issue POST xhr w/ form data
      request({
        method: 'POST',
        url: this.props.url,
        data: POST,
        headers: {}
      },
      function(err, res, body) {
        if (res.statusCode !== 200) {
          _this.props.error(body)
          _this.setState({
            message: {
              type: 'error',
              text: _this.props.errorMsg
            }
          })
        }
        else {
          _this.props.success(body)
          _this.setState({
            message: {
              type: 'success',
              text: _this.props.successMsg
            }
          })
          FormActions.formSuccess()
        }
      })
    },
    render: function() {
      return (
        <form className='form row' onSubmit={this.submit}>
          {this.props.fields.map(function(field, i) {
            return <FormField key={i} field={field} />
          })}
          <FormMsg message={this.state.message} big={true} center={true} />
        </form>
      )
    }
  })
}

module.exports = Form
