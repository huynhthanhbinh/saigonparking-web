/**
 * @fileoverview gRPC-Web generated client stub for com.bht.saigonparking.api.grpc.auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var Actor_pb = require('./Actor_pb.js')

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')
const proto = {};
proto.com = {};
proto.com.bht = {};
proto.com.bht.saigonparking = {};
proto.com.bht.saigonparking.api = {};
proto.com.bht.saigonparking.api.grpc = {};
proto.com.bht.saigonparking.api.grpc.auth = require('./Auth_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest,
 *   !proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>}
 */
const methodInfo_AuthService_validateUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse,
  /** @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.validateUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/validateUser',
      request,
      metadata || {},
      methodInfo_AuthService_validateUser,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.ValidateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.auth.ValidateResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.validateUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/validateUser',
      request,
      metadata || {},
      methodInfo_AuthService_validateUser);
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest,
 *   !proto.com.bht.saigonparking.api.grpc.auth.RegisterResponse>}
 */
const methodInfo_AuthService_registerUser = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.auth.RegisterResponse,
  /** @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.auth.RegisterResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.auth.RegisterResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.auth.RegisterResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServiceClient.prototype.registerUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/registerUser',
      request,
      metadata || {},
      methodInfo_AuthService_registerUser,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.auth.RegisterRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.auth.RegisterResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.auth.AuthServicePromiseClient.prototype.registerUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.auth.AuthService/registerUser',
      request,
      metadata || {},
      methodInfo_AuthService_registerUser);
};


module.exports = proto.com.bht.saigonparking.api.grpc.auth;

