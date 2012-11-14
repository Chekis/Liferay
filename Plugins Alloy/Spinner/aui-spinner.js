AUI().add('basic-plugin', function(A) {
    //create namespaced plugin class
    A.namespace('MyPlugins').Spinner = A.Base.create("Spinner", A.Plugin.Base, [], {

        _handle : null,

        //constructor
        initializer : function() {
            this._handle =     this.get("host");
                var tgt =      this.get("host"),
					step =     this.get("step").toFixed(2).replace(".00", ""),
					initVal =  this.get("initVal"),
					max =      this.get("max"),
					min =      this.get("min"),
					type =     this.get("type"),
					id =       this.get("id"),
					cssClass = this.get("cssClass"),
					renderTo = this.get("renderTo"),
					name     = tgt.getAttribute('name');
					
					tgt.setAttribute('readonly','readonly');
					tgt.wrap('<div id="'+id+'" class="aui-spinner '+cssClass+' '+name+'" />');
					tgt.setAttribute('value',initVal);
					
					switch(type){

						case 'horizontal-center':
							
							tgt.ancestor().addClass("aui-spinner-horizontal aui-spinner-horizontal-center");							
							tgt.insert('<div tabindex="0" class="aui-spinner-less" ></div>','before');							
							tgt.insert('<div tabindex="0" class="aui-spinner-more" ></div>','after');							
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');							
							break;
						
						case 'horizontal-top':
							
							tgt.ancestor().addClass("aui-spinner-horizontal aui-spinner-horizontal-top");							
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');							
							tgt.next().insert('<div class="aui-spinner-buttons-horizontal-spinner"></div>','after');							
							tgt.next().next().append('<div tabindex="0" class="aui-spinner-less" ></div>');							
							tgt.next().next().append('<div tabindex="0" class="aui-spinner-more" ></div>');							
							break;

						case 'horizontal-bottom':
							
							tgt.ancestor().addClass("aui-spinner-horizontal  aui-spinner-horizontal-bottom");							
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');							
							tgt.insert('<div class="aui-spinner-buttons-horizontal-spinner"></div>','before');							
							tgt.previous().append('<div tabindex="0" class="aui-spinner-less" ></div>');							
							tgt.previous().append('<div tabindex="0" class="aui-spinner-more" ></div>');
							break;

						case 'vertical-right':
							
							tgt.ancestor().addClass("aui-spinner-vertical aui-spinner-vertical-right");						
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');							
							tgt.insert('<div class="aui-spinner-buttons-vertical-spinner"></div>','before');							
							tgt.previous().append('<div tabindex="0" class="aui-spinner-less" ></div>');							
							tgt.previous().append('<div tabindex="0" class="aui-spinner-more" ></div>');							
							break;
						
						
						case 'vertical-left':
							
							tgt.ancestor().addClass("aui-spinner-vertical aui-spinner-vertical-left");							
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');						
							tgt.next().insert('<div class="aui-spinner-buttons-vertical-spinner"></div>','after');						
							tgt.next().next().append('<div tabindex="0" class="aui-spinner-less" ></div>');							
							tgt.next().next().append('<div tabindex="0" class="aui-spinner-more" ></div>');
							break;
						
											
						case 'vertical-center':
							
							tgt.ancestor().addClass("aui-spinner-vertical aui-spinner-vertical-center");							
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');							
							tgt.next().insert('<div tabindex="0" class="aui-spinner-less" ></div>','after');							
							tgt.insert('<div tabindex="0" class="aui-spinner-more" ></div>','before');					
							break;
					
						default:
						
							tgt.ancestor().addClass("aui-spinner-horizontal aui-spinner-horizontal-center");							
							tgt.insert('<div tabindex="0" class="aui-spinner-less" ></div>','before');							
							tgt.insert('<div tabindex="0" class="aui-spinner-more" ></div>','after');							
							tgt.insert('<div tabindex="0" class="aui-spinner-input" >'+initVal+'</div>','after');							
							break;
												
					}
					
					if(renderTo != ""){
						var tgtClone = tgt.ancestor('.aui-spinner').cloneNode(true);
						tgt.ancestor('.aui-spinner').remove();
						A.one(renderTo).append(tgtClone);
						tgt=A.one(renderTo).one('.'+name+' input[type="text"]');		
					}
					
					/***SUMA***/
						
					tgt.ancestor('.aui-spinner').one('.aui-spinner-more').on('click',function(){
						suma(this);
					});
					
					tgt.ancestor('.aui-spinner').one('.aui-spinner-more').on('keyup',function(event){
						if(event.keyCode == 13) {
							suma(this);
						}	
					});						
						
						
					/***RESTA***/
					
					tgt.ancestor('.aui-spinner').one('.aui-spinner-less').on('click',function(){
						resta(this);
					});
					
					tgt.ancestor('.aui-spinner').one('.aui-spinner-less').on('keyup',function(event){
						if(event.keyCode == 13) {
							resta(this);
						}
					});

					
					/***FLECHAS***/
						
					tgt.next().on('keyup',function(event){
						if(event.keyCode == 39) {
							suma(this);
						}

						else if(event.keyCode == 37) {
							resta(this);
						}
						
					});
					
					
					
					function suma(elem){
					
						var input = elem.ancestor('.aui-spinner').one('input[type="text"]');
						var value = input.getAttribute('value');
						if((parseFloat(value) + parseFloat(step)) <= max){
						
							var result = (parseFloat(value) + parseFloat(step)).toFixed(2).replace(".00", "");				
							input.setAttribute('value',result);
							input.next().text(result);
						}
					
					};	

					function resta(elem){

						var input = elem.ancestor('.aui-spinner').one('input[type="text"]');
						var value = input.getAttribute('value');
						if((parseFloat(value) - parseFloat(step)) >= min){
						
							var result = (parseFloat(value) - parseFloat(step)).toFixed(2).replace(".00", "");								
							input.setAttribute('value',result);
							input.next().text(result);
						}
									
					};	

		},

        //clean up on destruction
        destructor : function() {
            this._handle.detach();

            this._handle = null;
        }
    },
    {
        NS : "bp",
        ATTRS : {
			id : { value : "" },
			cssClass : { value : ""},
			step : { value : 1},
			initVal : { value : 0},
			max : { value : 9999999},
			min : { value : -9999999},
			type : { value : "horizontal-center"},
			renderTo : { value : ""}
        }
    });
}, "0.1", { requires : [ "base", "plugin", "node" ] });