/**
 * @fileoverview gRPC-Web generated client stub for com.bht.saigonparking.api.grpc.booking
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js')

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')
const proto = {};
proto.com = {};
proto.com.bht = {};
proto.com.bht.saigonparking = {};
proto.com.bht.saigonparking.api = {};
proto.com.bht.saigonparking.api.grpc = {};
proto.com.bht.saigonparking.api.grpc.booking = require('./Booking_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient =
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

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient =
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

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse>}
 */
const methodDescriptor_BookingService_createBooking = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/createBooking',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest,
  proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse>}
 */
const methodInfo_BookingService_createBooking = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.createBooking =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/createBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_createBooking,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.CreateBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.CreateBookingResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.createBooking =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/createBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_createBooking);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_BookingService_updateBookingStatus = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/updateBookingStatus',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_BookingService_updateBookingStatus = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.updateBookingStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/updateBookingStatus',
      request,
      metadata || {},
      methodDescriptor_BookingService_updateBookingStatus,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.UpdateBookingStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.updateBookingStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/updateBookingStatus',
      request,
      metadata || {},
      methodDescriptor_BookingService_updateBookingStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.StringValue,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_BookingService_deleteBookingById = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/deleteBookingById',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.StringValue,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.StringValue,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_BookingService_deleteBookingById = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.deleteBookingById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/deleteBookingById',
      request,
      metadata || {},
      methodDescriptor_BookingService_deleteBookingById,
      callback);
};


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.deleteBookingById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/deleteBookingById',
      request,
      metadata || {},
      methodDescriptor_BookingService_deleteBookingById);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>}
 */
const methodDescriptor_BookingService_countAllBookingGroupByStatus = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingGroupByStatus',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>}
 */
const methodInfo_BookingService_countAllBookingGroupByStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllBookingGroupByStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingGroupByStatus',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingGroupByStatus,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllBookingGroupByStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingGroupByStatus',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingGroupByStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse>}
 */
const methodDescriptor_BookingService_generateBookingQrCode = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/generateBookingQrCode',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest,
  proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse>}
 */
const methodInfo_BookingService_generateBookingQrCode = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.generateBookingQrCode =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/generateBookingQrCode',
      request,
      metadata || {},
      methodDescriptor_BookingService_generateBookingQrCode,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.GenerateBookingQrCodeResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.generateBookingQrCode =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/generateBookingQrCode',
      request,
      metadata || {},
      methodDescriptor_BookingService_generateBookingQrCode);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_BookingService_finishBooking = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/finishBooking',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_BookingService_finishBooking = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.finishBooking =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/finishBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_finishBooking,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.FinishBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.finishBooking =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/finishBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_finishBooking);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodDescriptor_BookingService_getAllBooking = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBooking',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest,
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodInfo_BookingService_getAllBooking = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.BookingList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.getAllBooking =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllBooking,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.getAllBooking =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllBooking);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_BookingService_countAllBooking = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBooking',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_BookingService_countAllBooking = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllBooking =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBooking,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllBooking =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBooking',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBooking);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodDescriptor_BookingService_getAllBookingOfCustomer = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBookingOfCustomer',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest,
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodInfo_BookingService_getAllBookingOfCustomer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.BookingList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.getAllBookingOfCustomer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBookingOfCustomer',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllBookingOfCustomer,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfCustomerRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.getAllBookingOfCustomer =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBookingOfCustomer',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllBookingOfCustomer);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_BookingService_countAllBookingOfCustomerByCustomerId = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfCustomerByCustomerId',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_BookingService_countAllBookingOfCustomerByCustomerId = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllBookingOfCustomerByCustomerId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfCustomerByCustomerId',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfCustomerByCustomerId,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllBookingOfCustomerByCustomerId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfCustomerByCustomerId',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfCustomerByCustomerId);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_BookingService_countAllBookingOfCustomerByAuthorizationHeader = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfCustomerByAuthorizationHeader',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_BookingService_countAllBookingOfCustomerByAuthorizationHeader = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllBookingOfCustomerByAuthorizationHeader =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfCustomerByAuthorizationHeader',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfCustomerByAuthorizationHeader,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllBookingOfCustomerByAuthorizationHeader =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfCustomerByAuthorizationHeader',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfCustomerByAuthorizationHeader);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodDescriptor_BookingService_getAllBookingOfParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBookingOfParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest,
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodInfo_BookingService_getAllBookingOfParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.BookingList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.getAllBookingOfParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllBookingOfParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.GetAllBookingOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.getAllBookingOfParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllBookingOfParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_BookingService_countAllBookingOfParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfParkingLot',
  grpc.web.MethodType.UNARY,
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_BookingService_countAllBookingOfParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllBookingOfParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfParkingLot,
      callback);
};


/**
 * @param {!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingOfParkingLotRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllBookingOfParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodDescriptor_BookingService_getAllOnGoingBookingOfParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllOnGoingBookingOfParkingLot',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 */
const methodInfo_BookingService_getAllOnGoingBookingOfParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.BookingList,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingList.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.BookingList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.getAllOnGoingBookingOfParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllOnGoingBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllOnGoingBookingOfParkingLot,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.BookingList>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.getAllOnGoingBookingOfParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getAllOnGoingBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_getAllOnGoingBookingOfParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodDescriptor_BookingService_countAllOnGoingBookingOfParkingLot = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllOnGoingBookingOfParkingLot',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.google.protobuf.Int64Value>}
 */
const methodInfo_BookingService_countAllOnGoingBookingOfParkingLot = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_wrappers_pb.Int64Value,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_wrappers_pb.Int64Value.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Int64Value)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Int64Value>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllOnGoingBookingOfParkingLot =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllOnGoingBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllOnGoingBookingOfParkingLot,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Int64Value>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllOnGoingBookingOfParkingLot =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllOnGoingBookingOfParkingLot',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllOnGoingBookingOfParkingLot);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.StringValue,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingDetail>}
 */
const methodDescriptor_BookingService_getBookingDetailByBookingId = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/getBookingDetailByBookingId',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.StringValue,
  proto.com.bht.saigonparking.api.grpc.booking.BookingDetail,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingDetail.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.StringValue,
 *   !proto.com.bht.saigonparking.api.grpc.booking.BookingDetail>}
 */
const methodInfo_BookingService_getBookingDetailByBookingId = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.BookingDetail,
  /**
   * @param {!proto.google.protobuf.StringValue} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.BookingDetail.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.BookingDetail)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.BookingDetail>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.getBookingDetailByBookingId =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getBookingDetailByBookingId',
      request,
      metadata || {},
      methodDescriptor_BookingService_getBookingDetailByBookingId,
      callback);
};


/**
 * @param {!proto.google.protobuf.StringValue} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.BookingDetail>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.getBookingDetailByBookingId =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/getBookingDetailByBookingId',
      request,
      metadata || {},
      methodDescriptor_BookingService_getBookingDetailByBookingId);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>}
 */
const methodDescriptor_BookingService_countAllBookingOfParkingLotGroupByStatus = new grpc.web.MethodDescriptor(
  '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfParkingLotGroupByStatus',
  grpc.web.MethodType.UNARY,
  google_protobuf_wrappers_pb.Int64Value,
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Int64Value,
 *   !proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>}
 */
const methodInfo_BookingService_countAllBookingOfParkingLotGroupByStatus = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse,
  /**
   * @param {!proto.google.protobuf.Int64Value} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServiceClient.prototype.countAllBookingOfParkingLotGroupByStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfParkingLotGroupByStatus',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfParkingLotGroupByStatus,
      callback);
};


/**
 * @param {!proto.google.protobuf.Int64Value} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.bht.saigonparking.api.grpc.booking.CountAllBookingGroupByStatusResponse>}
 *     A native promise that resolves to the response
 */
proto.com.bht.saigonparking.api.grpc.booking.BookingServicePromiseClient.prototype.countAllBookingOfParkingLotGroupByStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.bht.saigonparking.api.grpc.booking.BookingService/countAllBookingOfParkingLotGroupByStatus',
      request,
      metadata || {},
      methodDescriptor_BookingService_countAllBookingOfParkingLotGroupByStatus);
};


module.exports = proto.com.bht.saigonparking.api.grpc.booking;

