import Ember from 'ember';

const { computed } = Ember;

/**
  Mixin to track image loading/error state
  and update css classes accordingly.

  @class ImageState
  @public
**/
export default Ember.Mixin.create({
  classNameBindings: ['_loadingClass', '_errorClass'],

  /**
    @property src
    @type String
    @default null
    @public
  */
  src: null,

  /**
    @property url
    @type String
    @default src
    @public
    The final src to load. Gives mixins a chance to modify src
  */
  url: computed.reads('src'),

  /**
    @property isLoading
    @type Boolean
    @default if the src is initially set
    @public
  */
  isLoading: true,

  /**
    @property isError
    @type Boolean
    @default false
    @public
  */
  isError: false,

  /**
    @property loadingClass
    @type String
    @default 'loading'
    @public
  */
  loadingClass: 'loading',

  /**
    @property errorClass
    @type String
    @default 'error'
    @public
  */
  errorClass: 'error',

  /**
    @private

    Computed property proxies for state classes
    so they can be easily overridden.

    @property loadingClass
    @property errorClass
  */
  _loadingClass: computed('isLoading', function() {
    if (this.get('isLoading')) {
      return this.get('loadingClass');
    }
  }),

  _errorClass: computed('isError', function() {
    if (this.get('isError')) {
      return this.get('errorClass');
    }
  })
});
