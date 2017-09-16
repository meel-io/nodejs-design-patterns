const stream = require('stream')

class ParallelStream extends stream.Transform {
 constructor(transformFunction) {
   super({objectMode: true})
   this.transformFunction = transformFunction;
   this.running = 0;
   this.terminateCallback = null
 }

 _transform(chunk, enc, done) {
   this.running++;
   this.transformFunction(data, enc, this.push.bind(this),
   this._onComplete.bind(this))
   done();
 }

 _flush(done) {
   if(this.running> 0) {
     this.terminateCallback = done
   } else {
     done()
   }
 }

 _onComplete(err) {
   this.running--
   if(err) {
     return this.emit('error', err)
   }
   if(this.running === 0) {
     this.terminateCallback && this.terminateCallback()
   }
 }

}

module.exports = ParallelStream
