const request = require('ajax-request')
const Form = require('./form.jsx')

const ContactForm = React.createClass({
  url: '/email',
  fields: [
    {
      name: 'name',
      type: 'text',
      grid: 'col-12',
      isRequired: true,
      placeholder: 'Name *',
      maxLength: 100,
      hideOnSuccess: true,
    },
    {
      name: 'email',
      type: 'text',
      grid: 'col-12',
      isRequired: true,
      placeholder: 'Email *',
      maxLength: 100,
      validation: 'email',
      hideOnSuccess: true,
    },
    {
      name: 'message',
      type: 'textarea',
      grid: 'col-12',
      isRequired: true,
      placeholder: 'Message *',
      maxLength: 300,
      hideOnSuccess: true,
    },
    {
      type: 'submit',
      grid: 'col-12',
      text: 'SEND',
      hideOnSuccess: true,
    },
  ],
  successMsg: 'Your message has been sent!',
  onSuccess: function(body) {
    // console.log('success', body)
  },
  errorMsg: 'Something went wrong. Try contacting me via LinkedIn (see link below).',
  onError: function(err) {
    // console.warn(err)
  },
  render: function() {
    const FormComponent = new Form()
    return <FormComponent url={this.url} fields={this.fields} success={this.onSuccess} error={this.onError} successMsg={this.successMsg} errorMsg={this.errorMsg} />
  }
})

const Sidebar = React.createClass({
  getDefaultProps: function() {
    return {
      greeting: 'Hi, I\'m Zak.',
      p1: 'I\'m a full stack web developer, with a background in graphic design and event production.',
      p2: 'I like to make cool stuff.',
      p3: 'I\'d love to talk to you about your project, so shoot me an email with some details and I\'ll get back to you as soon as I can.',
      p4: 'Thanks for checking out my site, and I can\'t wait to work together!',
    }
  },
  render: function() {
    return (
      <aside className='sidebar'>
        <div className='inner'>
          <h1>{this.props.greeting}</h1>
          <p>{this.props.p1}</p>
          <p>{this.props.p2}</p>
          <p>{this.props.p3}</p>
          <ContactForm />
          <p>{this.props.p4}</p>
        </div>
      </aside>
    )
  }
})

module.exports = Sidebar
