const version = '0.3.3';
const english = {
    // status
    'status_initializing_signal': 'initializing signal',
    'status_waiting_participant': 'waiting participant',
    'status_connected': 'connected',
    'status_disconnected': 'disconnected',
    'status_connecting': 'connecting',
    'status_failed': 'failed',

    // notifications
    'n_peer_connection_not_established': 'Peer connection is not established',
    'n_connected_to_peer': 'Connected to the peer',
    'n_failed_to_establish_connection': 'Failed to establish connection to remote peer!',
    'n_disconnected_from_peer': 'Disconnected from the peer',
    'n_secret_room_created': 'Secret room is created, waiting another participant to join!',
    'n_nobody_joined_to_room': 'Nobody joined to room, signal is closed!',
    'n_could_not_establish_peer_connection': 'Could not establish peer to peer connection',
    'n_signaling_error': 'Something went wrong on signaling, please rejoin',
    'n_waiting_participant': 'Waiting a participant to join to the room',
    'n_participant_joined': 'A participant joined to the room',
    'n_could_not_init_encryption_library': 'Could not init encryption library!',
    'n_invalid_word': 'Invalid word',
    'n_invalid_pin': 'Invalid pin (must be 6 digit number)',
    'n_peer_connection_needed_for_file_transfer': 'To send file, you need to establish connection to a peer!',
    'n_empty_file': 'Empty files can not be transfered',
    'n_unknown_command': 'Unknown command',
    'n_debug_enabled': 'Debug mode enabled!',
    'n_hash_command': 'Hash command is written to input, press enter/return to apply',
    'n_peer_connection_failed': 'Peer connection closed and failed to re-establish',
};

let lang;

function setLanguage(locale) {
    switch(locale) {
        case 'en_US':
            lang = english;
            break
        default:
            lang = english;
    }
}
/*
Copyright 2023 Mustafa Turan
https://github.com/mustafaturan
*/
const words = ['abandon','ability','able','about','above','absent','absorb','abstract','absurd','abuse','access','accident','account','accuse','achieve','acid','acoustic','acquire','across','act','action','actor','actress','actual','adapt','add','addict','address','adjust','admit','adult','advance','advice','aerobic','affair','afford','afraid','again','age','agent','agree','ahead','aim','air','airport','aisle','alarm','album','alcohol','alert','alien','all','alley','allow','almost','alone','alpha','already','also','alter','always','amateur','amazing','among','amount','amused','analyst','anchor','ancient','anger','angle','angry','animal','ankle','announce','annual','another','answer','antenna','antique','anxiety','any','apart','apology','appear','apple','approve','april','arch','arctic','area','arena','argue','arm','armed','armor','army','around','arrange','arrest','arrive','arrow','art','artefact','artist','artwork','ask','aspect','assault','asset','assist','assume','asthma','athlete','atom','attack','attend','attitude','attract','auction','audit','august','aunt','author','auto','autumn','average','avocado','avoid','awake','aware','away','awesome','awful','awkward','axis','baby','bachelor','bacon','badge','bag','balance','balcony','ball','bamboo','banana','banner','bar','barely','bargain','barrel','base','basic','basket','battle','beach','bean','beauty','because','become','beef','before','begin','behave','behind','believe','below','belt','bench','benefit','best','betray','better','between','beyond','bicycle','bid','bike','bind','biology','bird','birth','bitter','black','blade','blame','blanket','blast','bleak','bless','blind','blood','blossom','blouse','blue','blur','blush','board','boat','body','boil','bomb','bone','bonus','book','boost','border','boring','borrow','boss','bottom','bounce','box','boy','bracket','brain','brand','brass','brave','bread','breeze','brick','bridge','brief','bright','bring','brisk','broccoli','broken','bronze','broom','brother','brown','brush','bubble','buddy','budget','buffalo','build','bulb','bulk','bullet','bundle','bunker','burden','burger','burst','bus','business','busy','butter','buyer','buzz','cabbage','cabin','cable','cactus','cage','cake','call','calm','camera','camp','can','canal','cancel','candy','cannon','canoe','canvas','canyon','capable','capital','captain','car','carbon','card','cargo','carpet','carry','cart','case','cash','casino','castle','casual','cat','catalog','catch','category','cattle','caught','cause','caution','cave','ceiling','celery','cement','census','century','cereal','certain','chair','chalk','champion','change','chaos','chapter','charge','chase','chat','cheap','check','cheese','chef','cherry','chest','chicken','chief','child','chimney','choice','choose','chronic','chuckle','chunk','churn','cigar','cinnamon','circle','citizen','city','civil','claim','clap','clarify','claw','clay','clean','clerk','clever','click','client','cliff','climb','clinic','clip','clock','clog','close','cloth','cloud','clown','club','clump','cluster','clutch','coach','coast','coconut','code','coffee','coil','coin','collect','color','column','combine','come','comfort','comic','common','company','concert','conduct','confirm','congress','connect','consider','control','convince','cook','cool','copper','copy','coral','core','corn','correct','cost','cotton','couch','country','couple','course','cousin','cover','coyote','crack','cradle','craft','cram','crane','crash','crater','crawl','crazy','cream','credit','creek','crew','cricket','crime','crisp','critic','crop','cross','crouch','crowd','crucial','cruel','cruise','crumble','crunch','crush','cry','crystal','cube','culture','cup','cupboard','curious','current','curtain','curve','cushion','custom','cute','cycle','dad','damage','damp','dance','danger','daring','dash','daughter','dawn','day','deal','debate','debris','decade','december','decide','decline','decorate','decrease','deer','defense','define','defy','degree','delay','deliver','demand','demise','denial','dentist','deny','depart','depend','deposit','depth','deputy','derive','describe','desert','design','desk','despair','destroy','detail','detect','develop','device','devote','diagram','dial','diamond','diary','dice','diesel','diet','differ','digital','dignity','dilemma','dinner','dinosaur','direct','dirt','disagree','discover','disease','dish','dismiss','disorder','display','distance','divert','divide','divorce','dizzy','doctor','document','dog','doll','dolphin','domain','donate','donkey','donor','door','dose','double','dove','draft','dragon','drama','drastic','draw','dream','dress','drift','drill','drink','drip','drive','drop','drum','dry','duck','dumb','dune','during','dust','dutch','duty','dwarf','dynamic','eager','eagle','early','earn','earth','easily','east','easy','echo','ecology','economy','edge','edit','educate','effort','egg','eight','either','elbow','elder','electric','elegant','element','elephant','elevator','elite','else','embark','embody','embrace','emerge','emotion','employ','empower','empty','enable','enact','end','endless','endorse','enemy','energy','enforce','engage','engine','enhance','enjoy','enlist','enough','enrich','enroll','ensure','enter','entire','entry','envelope','episode','equal','equip','era','erase','erode','erosion','error','erupt','escape','essay','essence','estate','eternal','ethics','evidence','evil','evoke','evolve','exact','example','excess','exchange','excite','exclude','excuse','execute','exercise','exhaust','exhibit','exile','exist','exit','exotic','expand','expect','expire','explain','expose','express','extend','extra','eye','eyebrow','fabric','face','faculty','fade','faint','faith','fall','false','fame','family','famous','fan','fancy','fantasy','farm','fashion','fat','fatal','father','fatigue','fault','favorite','feature','february','federal','fee','feed','feel','female','fence','festival','fetch','fever','few','fiber','fiction','field','figure','file','film','filter','final','find','fine','finger','finish','fire','firm','first','fiscal','fish','fit','fitness','fix','flag','flame','flash','flat','flavor','flee','flight','flip','float','flock','floor','flower','fluid','flush','fly','foam','focus','fog','foil','fold','follow','food','foot','force','forest','forget','fork','fortune','forum','forward','fossil','foster','found','fox','fragile','frame','frequent','fresh','friend','fringe','frog','front','frost','frown','frozen','fruit','fuel','fun','funny','furnace','fury','future','gadget','gain','galaxy','gallery','game','gap','garage','garbage','garden','garlic','garment','gas','gasp','gate','gather','gauge','gaze','general','genius','genre','gentle','genuine','gesture','ghost','giant','gift','giggle','ginger','giraffe','girl','give','glad','glance','glare','glass','glide','glimpse','globe','gloom','glory','glove','glow','glue','goat','goddess','gold','good','goose','gorilla','gospel','gossip','govern','gown','grab','grace','grain','grant','grape','grass','gravity','great','green','grid','grief','grit','grocery','group','grow','grunt','guard','guess','guide','guilt','guitar','gun','gym','habit','hair','half','hammer','hamster','hand','happy','harbor','hard','harsh','harvest','hat','have','hawk','hazard','head','health','heart','heavy','hedgehog','height','hello','helmet','help','hen','hero','hidden','high','hill','hint','hip','hire','history','hobby','hockey','hold','hole','holiday','hollow','home','honey','hood','hope','horn','horror','horse','hospital','host','hotel','hour','hover','hub','huge','human','humble','humor','hundred','hungry','hunt','hurdle','hurry','hurt','husband','hybrid','ice','icon','idea','identify','idle','ignore','ill','illegal','illness','image','imitate','immense','immune','impact','impose','improve','impulse','inch','include','income','increase','index','indicate','indoor','industry','infant','inflict','inform','inhale','inherit','initial','inject','injury','inmate','inner','innocent','input','inquiry','insane','insect','inside','inspire','install','intact','interest','into','invest','invite','involve','iron','island','isolate','issue','item','ivory','jacket','jaguar','jar','jazz','jealous','jeans','jelly','jewel','job','join','joke','journey','joy','judge','juice','jump','jungle','junior','junk','just','kangaroo','keen','keep','ketchup','key','kick','kid','kidney','kind','kingdom','kiss','kit','kitchen','kite','kitten','kiwi','knee','knife','knock','know','lab','label','labor','ladder','lady','lake','lamp','language','laptop','large','later','latin','laugh','laundry','lava','law','lawn','lawsuit','layer','lazy','leader','leaf','learn','leave','lecture','left','leg','legal','legend','leisure','lemon','lend','length','lens','leopard','lesson','letter','level','liar','liberty','library','license','life','lift','light','like','limb','limit','link','lion','liquid','list','little','live','lizard','load','loan','lobster','local','lock','logic','lonely','long','loop','lottery','loud','lounge','love','loyal','lucky','luggage','lumber','lunar','lunch','luxury','lyrics','machine','mad','magic','magnet','maid','mail','main','major','make','mammal','man','manage','mandate','mango','mansion','manual','maple','marble','march','margin','marine','market','marriage','mask','mass','master','match','material','math','matrix','matter','maximum','maze','meadow','mean','measure','meat','mechanic','medal','media','melody','melt','member','memory','mention','menu','mercy','merge','merit','merry','mesh','message','metal','method','middle','midnight','milk','million','mimic','mind','minimum','minor','minute','miracle','mirror','misery','miss','mistake','mix','mixed','mixture','mobile','model','modify','mom','moment','monitor','monkey','monster','month','moon','moral','more','morning','mosquito','mother','motion','motor','mountain','mouse','move','movie','much','muffin','mule','multiply','muscle','museum','mushroom','music','must','mutual','myself','mystery','myth','naive','name','napkin','narrow','nasty','nation','nature','near','neck','need','negative','neglect','neither','nephew','nerve','nest','net','network','neutral','never','news','next','nice','night','noble','noise','nominee','noodle','normal','north','nose','notable','note','nothing','notice','novel','now','nuclear','number','nurse','nut','oak','obey','object','oblige','obscure','observe','obtain','obvious','occur','ocean','october','odor','off','offer','office','often','oil','okay','old','olive','olympic','omit','once','one','onion','online','only','open','opera','opinion','oppose','option','orange','orbit','orchard','order','ordinary','organ','orient','original','orphan','ostrich','other','outdoor','outer','output','outside','oval','oven','over','own','owner','oxygen','oyster','ozone','pact','paddle','page','pair','palace','palm','panda','panel','panic','panther','paper','parade','parent','park','parrot','party','pass','patch','path','patient','patrol','pattern','pause','pave','payment','peace','peanut','pear','peasant','pelican','pen','penalty','pencil','people','pepper','perfect','permit','person','pet','phone','photo','phrase','physical','piano','picnic','picture','piece','pig','pigeon','pill','pilot','pink','pioneer','pipe','pistol','pitch','pizza','place','planet','plastic','plate','play','please','pledge','pluck','plug','plunge','poem','poet','point','polar','pole','police','pond','pony','pool','popular','portion','position','possible','post','potato','pottery','poverty','powder','power','practice','praise','predict','prefer','prepare','present','pretty','prevent','price','pride','primary','print','priority','prison','private','prize','problem','process','produce','profit','program','project','promote','proof','property','prosper','protect','proud','provide','public','pudding','pull','pulp','pulse','pumpkin','punch','pupil','puppy','purchase','purity','purpose','purse','push','put','puzzle','pyramid','quality','quantum','quarter','question','quick','quit','quiz','quote','rabbit','raccoon','race','rack','radar','radio','rail','rain','raise','rally','ramp','ranch','random','range','rapid','rare','rate','rather','raven','raw','razor','ready','real','reason','rebel','rebuild','recall','receive','recipe','record','recycle','reduce','reflect','reform','refuse','region','regret','regular','reject','relax','release','relief','rely','remain','remember','remind','remove','render','renew','rent','reopen','repair','repeat','replace','report','require','rescue','resemble','resist','resource','response','result','retire','retreat','return','reunion','reveal','review','reward','rhythm','rib','ribbon','rice','rich','ride','ridge','rifle','right','rigid','ring','riot','ripple','risk','ritual','rival','river','road','roast','robot','robust','rocket','romance','roof','rookie','room','rose','rotate','rough','round','route','royal','rubber','rude','rug','rule','run','runway','rural','sad','saddle','sadness','safe','sail','salad','salmon','salon','salt','salute','same','sample','sand','satisfy','satoshi','sauce','sausage','save','say','scale','scan','scare','scatter','scene','scheme','school','science','scissors','scorpion','scout','scrap','screen','script','scrub','sea','search','season','seat','second','secret','section','security','seed','seek','segment','select','sell','seminar','senior','sense','sentence','series','service','session','settle','setup','seven','shadow','shaft','shallow','share','shed','shell','sheriff','shield','shift','shine','ship','shiver','shock','shoe','shoot','shop','short','shoulder','shove','shrimp','shrug','shuffle','shy','sibling','sick','side','siege','sight','sign','silent','silk','silly','silver','similar','simple','since','sing','siren','sister','situate','six','size','skate','sketch','ski','skill','skin','skirt','skull','slab','slam','sleep','slender','slice','slide','slight','slim','slogan','slot','slow','slush','small','smart','smile','smoke','smooth','snack','snake','snap','sniff','snow','soap','soccer','social','sock','soda','soft','solar','soldier','solid','solution','solve','someone','song','soon','sorry','sort','soul','sound','soup','source','south','space','spare','spatial','spawn','speak','special','speed','spell','spend','sphere','spice','spider','spike','spin','spirit','split','spoil','sponsor','spoon','sport','spot','spray','spread','spring','spy','square','squeeze','squirrel','stable','stadium','staff','stage','stairs','stamp','stand','start','state','stay','steak','steel','stem','step','stereo','stick','still','sting','stock','stomach','stone','stool','story','stove','strategy','street','strike','strong','struggle','student','stuff','stumble','style','subject','submit','subway','success','such','sudden','suffer','sugar','suggest','suit','summer','sun','sunny','sunset','super','supply','supreme','sure','surface','surge','surprise','surround','survey','suspect','sustain','swallow','swamp','swap','swarm','swear','sweet','swift','swim','swing','switch','sword','symbol','symptom','syrup','system','table','tackle','tag','tail','talent','talk','tank','tape','target','task','taste','tattoo','taxi','teach','team','tell','ten','tenant','tennis','tent','term','test','text','thank','that','theme','then','theory','there','they','thing','this','thought','three','thrive','throw','thumb','thunder','ticket','tide','tiger','tilt','timber','time','tiny','tip','tired','tissue','title','toast','tobacco','today','toddler','toe','together','toilet','token','tomato','tomorrow','tone','tongue','tonight','tool','tooth','top','topic','topple','torch','tornado','tortoise','toss','total','tourist','toward','tower','town','toy','track','trade','traffic','tragic','train','transfer','trap','trash','travel','tray','treat','tree','trend','trial','tribe','trick','trigger','trim','trip','trophy','trouble','truck','true','truly','trumpet','trust','truth','try','tube','tuition','tumble','tuna','tunnel','turkey','turn','turtle','twelve','twenty','twice','twin','twist','two','type','typical','ugly','umbrella','unable','unaware','uncle','uncover','under','undo','unfair','unfold','unhappy','uniform','unique','unit','universe','unknown','unlock','until','unusual','unveil','update','upgrade','uphold','upon','upper','upset','urban','urge','usage','use','used','useful','useless','usual','utility','vacant','vacuum','vague','valid','valley','valve','van','vanish','vapor','various','vast','vault','vehicle','velvet','vendor','venture','venue','verb','verify','version','very','vessel','veteran','viable','vibrant','vicious','victory','video','view','village','vintage','violin','virtual','virus','visa','visit','visual','vital','vivid','vocal','voice','void','volcano','volume','vote','voyage','wage','wagon','wait','walk','wall','walnut','want','warfare','warm','warrior','wash','wasp','waste','water','wave','way','wealth','weapon','wear','weasel','weather','web','wedding','weekend','weird','welcome','west','wet','whale','what','wheat','wheel','when','where','whip','whisper','wide','width','wife','wild','will','win','window','wine','wing','wink','winner','winter','wire','wisdom','wise','wish','witness','wolf','woman','wonder','wood','wool','word','work','world','worry','worth','wrap','wreck','wrestle','wrist','write','wrong','yard','year','yellow','you','young','youth','zebra','zero','zone','zoo'];

// Salts are randomly generated and subject to change frequently
const SALT_AES = new Uint8Array([159,119,78,80,66,242,155,172,158,4,61,8,224,151,222,59,104,69,213,155,149,60,194,200,139,61,82,166,218,118,239,114]);
const SALT_DIGEST = new Uint8Array([170,15,26,174,196,215,52,183,242,93,116,163,186,36,223,246,117,79,19,116,200,40,239,108,50,42,174,81,218,0,6,186]);

class LockIO {
    constructor(chipher, nonce) {
        this._chipher = chipher;
        this._nonce = nonce;
    }

    get chipher() {
        return this._chipher;
    }

    get nonce() {
        return this._nonce;
    }
}

class Locksmith {
    constructor(word1, word2, pin) {
        if (!words.includes(word1)) {
            throw new Error(`invalid word: ${word1}`);
        }
        if (!words.includes(word2)) {
            throw new Error(`invalid word: ${word2}`);
        }
        if (!(!isNaN(parseFloat(pin)) && isFinite(pin)) || pin.length !== 6) {
            throw new Error(`pincode must be a 6 digit number! ${pin}`);
        }

        pin = parseInt(pin);

        const nums = [
            words.indexOf(word1),
            words.indexOf(word2),
            pin
        ];

        this._digestEntropy = this.binToUint8Array(
            (nums[1]%2048).toString(2).padStart(11, '0') +
            (nums[2]).toString(2).padStart(17, '0') +
            (nums[0]%2048).toString(2).padStart(11, '0')
        );

        this._entropy = this.binToUint8Array(
            (nums[0]%2048).toString(2).padStart(11, '0') +
            (nums[1]%2048).toString(2).padStart(11, '0') +
            (nums[2]).toString(2).padStart(17, '0')
        );
    }

    async digest() {
        if (this._digest !== undefined) {
            return this._digest;
        }

        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            this._digestEntropy,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey'],
        );

        const digest = await window.crypto.subtle.deriveBits(
            {
              name: 'PBKDF2',
              salt: SALT_DIGEST,
              iterations: 262144, // 2^18
              hash: 'SHA-256',
            },
            keyMaterial,
            128,
        );

        this._digest = this.uint8ArrayToHex(digest);
        return this._digest;
    }

    async deriveKey() {
        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            this._entropy,
            'PBKDF2',
            false,
            ['deriveBits', 'deriveKey'],
        );

        this._rootKey = await window.crypto.subtle.deriveKey(
            {
              name: 'PBKDF2',
              salt: SALT_AES,
              iterations: 100000, // (ensure the iterations is lower than the iterations for digest)
              hash: 'SHA-256',
            },
            keyMaterial,
            { 'name': 'AES-GCM', 'length': 256},
            true,
            ['encrypt', 'decrypt'],
        );
    }

    async encrypt(plaintext) {
        // generate random iv
        const nonce = new Uint8Array(16);
        window.crypto.getRandomValues(nonce);

        if (this._rootKey === undefined) {
            await this.deriveKey();
        }

        let enc = new TextEncoder();

        const chipher = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: nonce },
            this._rootKey,
            enc.encode(plaintext),
        );

        return new LockIO(chipher, nonce);
    }

    async decrypt(chiphertext, nonce) {
        if (this._rootKey === undefined) {
            await this.deriveKey();
        }

        let decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: nonce },
            this._rootKey,
            chiphertext
        );

        let dec = new TextDecoder();
        return dec.decode(decrypted);
    }

    stringToUint8Array(str) {
        let vals = str.split(',');
        let arr = new Uint8Array(vals.length);
        let i = 0;
        for (const v of vals) {
            arr[i] = v;
            i++;
        }
        return arr;
    }

    binToUint8Array(bStr) {
    	let size = Math.ceil(bStr.length / 8);
	    let vals = new Uint8Array(size);
        for (var i = 0; i < bStr.length; i += 8) {
            for (var j = 0; j < 8; j++) {
                vals[i/8] += (bStr[i+j] === '0' ? 0 : Math.pow(2, 7-j));
            }
        }

        return vals;
    }

    uint8ArrayToHex(vals) {
        const hex = [...new Uint8Array(vals)]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('');
        return hex;
    }

    async uint8ArrayToBase64(data) {
        // Use a FileReader to generate a base64 data URI
        const base64url = await new Promise((r) => {
            const reader = new FileReader();
            reader.onload = () => r(reader.result);
            reader.readAsDataURL(new Blob([data]));
        });

        /*
        The result looks like
        "data:application/octet-stream;base64,<your base64 data>",
        so we split off the beginning:
        */
        return base64url.split(",", 2)[1];
    }

    base64ToUint8Array(data) {
        return Uint8Array.from(atob(data), c => c.charCodeAt(0));
    }
}

class KeyMaker {
    static random() {
        const nums = new Uint32Array(3);
        window.crypto.getRandomValues(nums);
        return [words[nums[0]%2048], words[nums[1]%2048], ''+(nums[2]%1000000).toString().padStart(6, '0')];
    }
}
/*
Copyright (c) 2023 Mustafa Turan
https://github.com/mustafaturan
*/
// peer connection configuration
const configuration = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        }
    ],
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'negotiate'
};
let signalURL = new URL('https://signals.secretpeer.com/signals');

class EventBus extends EventTarget {
    async on(type, fn) {
        this.addEventListener(type, function(event) {
            fn(event.detail);
        });
    }

    async emit(type, data) {
        const ce = new CustomEvent(type, {detail: data});
        this.dispatchEvent(ce);
    }
}

class FileDC extends EventBus {
    constructor(id, dc, debug) {
        super();
        // set debugging level
        this._debug = debug;

        this._id = id;
        this._dc = dc;
        this._dc.binaryType = 'arraybuffer';
        this._dc.bufferedAmountLowThreshold = 65535;
        this._dc.onclose = this.#_onDataChannelClose.bind(this);
        this._dc.onerror = this.#_onDataChannelError.bind(this);
        this._dc.onopen = this.#_onDataChannelOpen.bind(this);
        this._dc.onmessage = this.#_onDataChannelMessage.bind(this);
    }

    async sendFile(bin) {
        if (this._dc && this._dc.readyState === 'open') {
            if (!this.hasBuffer) {
                this._dc.onbufferedamountlow = () => {
                    this._dc.onbufferedamountlow = null;
                    this.sendFile(bin);
                };
                return;
            }

            try {
                this._dc.send(bin);
            } catch (e) {
                this._dc.onbufferedamountlow = () => {
                    this._dc.onbufferedamountlow = null;
                    this.sendFile(bin);
                };
                this.log(`[webrtc/fc] got error on sending file ${e.message}`);
            }
        } else {
            throw new Error(`[webrtc/fc] readystate for '${this._id}': ${this._dc ? this._dc.readyState : 'undefined'}`);
        }
    }

    async close() {
        if (this._dc && this._dc.readyState === 'open') {
            this._dc.close();
        }
    }

    get hasBuffer() {
        return this._dc.bufferedAmountLowThreshold >= this._dc.bufferedAmount;
    }

    async #_onDataChannelMessage(event) {
        this.emit('onpeerfile', {data: event.data, id: this._id});
        this.log(`[webrtc/fc] file content received for '${this._id}' with byte size '${event.data.byteLength}'`);
    }

    async #_onDataChannelOpen(_event) {
        this.log(`[webrtc/fc] file dc opened for '${this._id}'`);
    }

    async #_onDataChannelClose(_event) {
        if (this._dc.readyState !== 'open') {
            this.emit('onfilechannelclose', {status: this._dc.readyState, id: this._id});
        }
        this.log(`[webrtc/fc] file dc for '${this._id}' closed`);
    }

    async #_onDataChannelError(event) {
        if (this._dc.readyState !== 'open') {
            this.emit('onfilechannelerror', {status: this._dc.readyState, id: this._id});
        }
        this.logerror(`[webrtc/dc] file dc error occurred for '${this._id}' with err: '${event.error}'`);
    }

    log(msg) {
        if (this._debug) {
            console.log(msg);
        }
    }

    logerror(msg) {
        console.error(msg);
    }
}

class PeerConnection extends EventBus {
    #signalPingCount;

    constructor(whois, url, configuration, room, locksmith, debug) {
        super();

        // set debugging level
        this._debug = debug;

        // caller / callee
        this._whois = whois;

        // room name
        this._room = room;

        // encryption / decryption service
        this._locksmith = locksmith;

        // is user closed the connection
        this._userClosed = false;

        // init candidates
        this._candidates = [];

        // init data channel
        this._textDC = null;

        // init file data channels
        this._fileDCs = {};

        // init signal ping count with 0
        this.#signalPingCount = 0;

        // peer connection
        this._pc = new RTCPeerConnection(configuration);
        this._pc.onicecandidate = this.#_onIceCandidate.bind(this);
        this._pc.onicegatheringstatechange = this.#_onIceCandidateGatheringStateChange.bind(this);
        this._pc.ondatachannel = this.#_onDataChannel.bind(this);
        this._pc.onconnectionstatechange = this.#_onConnectionStateChange.bind(this);
        this._pc.onnegotiationneeded = this.#onNegotiationNeeded.bind(this);

        this._signalURL = url;
    }

    async _sendSignal(signalMsg) {
        fetch(this._signalURL, {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(signalMsg)
        }).then(response => response.json().then(data =>
            this.log(`[signal] sent: ${JSON.stringify(signalMsg)}, got response: ${data.status}`)
        ));
    }

    async _querySignal(callbackFn) {
        this.#signalPingCount += 1;
        const url = this._signalURL +
            '?room=' + this._room +
            '&intent=' + (this._whois === 'caller' ? 'answer' : 'offer') +
            '&nonce=' + Math.floor(Math.random() * Math.floor(999999));
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'reload',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'error',
            referrerPolicy: 'no-referrer',
        });

        if (response.ok) {
            this.emit('onsignalmessage', {status: 'ready'});
            let handleSignal = this.#handleSignal.bind(this);
            callbackFn = callbackFn.bind(this);
            response.json().then(signalMsg => {
                handleSignal(callbackFn, signalMsg);
            });
        } else if (this.#signalPingCount > 20) {
            this.emit('onsignalclose', {status: 'failed'})
            return
        } else {
            setTimeout(function() {
                this._querySignal(callbackFn);
            }.bind(this),30000);
            this.emit('onsignalmessage', {status: 'wait'});
        }
    }

    async #handleSignal(callbackFn, signalMsg) {
        const descCipher = this._locksmith.base64ToUint8Array(signalMsg.desc);
        const nonce = this._locksmith.base64ToUint8Array(signalMsg.nonce);
        const desc = await this._locksmith.decrypt(descCipher, nonce);
        await callbackFn(desc);
    }

    async sendText(text) {
        if (this._textDC && this._textDC.readyState === 'open') {
            this._textDC.send(JSON.stringify(text));
        } else {
            throw new Error(`[webrtc/tc] readystate: ${this._textDC ? this._textDC.readyState : 'undefined'}`);
        }
    }

    async sendFile(id, bin) {
        this._fileDCs[id].sendFile(bin);
    }

    async hangup() {
        if (this._textDC && this._textDC.readyState === 'open') {
            this._textDC.close();
        }
        this._textDC = null;

        for (const id in this._fileDCs) {
            await this._fileDCs[id].close();
            delete this._fileDCs[id];
        }
        this._fileDCs = {}

        if (this._pc) {
            this._pc.close();
        }
        this._pc = null;
    }

    async createFileDC(id, name, size) {
        let dc = this._pc.createDataChannel(this.labelPrefix(id, size) + name, {ordered: true});
        this._fileDCs[id] = new FileDC(id, dc, this._debug);
    }

    async destroyFileDC(id) {
        await this._fileDCs[id].close();
        delete this._fileDCs[id];
    }

    hasBuffer(id) {
        return this._fileDCs[id] && this._fileDCs[id].hasBuffer;
    }

    get isConnected() {
        return this.connectionState === 'connected';
    }

    get isFailed() {
        return this.connectionState === 'failed';
    }

    get _queried() {
        return this.#signalPingCount > 0;
    }

    get connectionState() {
        let state = 'disconnected';
        if (this._pc) {
            state = this._pc.connectionState ? this._pc.connectionState : this._pc.iceConnectionState;
        }
        if (state === 'conected' && (!this._textDC || this._textDC.readyState !== 'open')) {
            state = 'waiting data channel';
        }
        if (state === 'connected' && this._textDC && (this._textDC.readyState === 'closed' || this._textDC.readyState === 'closing')) {
            state = this._textDC.readyState;
        }
        if (state === 'disconnected' && (!this._pc || this._pc.connectionState === 'failed')) {
            return 'failed';
        }
        return state;
    }

    async _onSession(desc) {
        await this._pc.setLocalDescription(desc);
        this.log(`[webrtc/pc] local description set to: \n${desc.sdp}`);
    }

    async _onCreateSessionDescriptionError(error) {
        this.logerror(`[webrtc/pc] failed to create session description: '${error.toString()}'`);
    }

    async #_onConnectionStateChange(_event) {
        this.log(`[webrtc/pc] connection state changed '${this._pc.connectionState}' / '${this._pc.iceConnectionState}'`);
        const state = this.connectionState;

        if (state === 'connected') {
            this.emit('onpeerconnected', {status: 'connected'});
        } else if (state === 'failed') {
            this.hangup();
        } else if (state === 'disconnected'){
            this.emit('onpeerdisconnected', {status: this.connectionState});
        }
    }

    async #onNegotiationNeeded(_event) {
        this.log('on negotiation needed event received!')
    }

    /*
        ICE Candidate events
    */
    async #_onIceCandidate(event) {
        this.log(`[webrtc/pc] ICE candidate: ${event.candidate ? event.candidate.candidate : `null`}`);
    }

    async #_onIceCandidateGatheringStateChange(event) {
        if (this._pc.iceGatheringState === 'complete') {
            const encrypted = await this._locksmith.encrypt(JSON.stringify(this._pc.localDescription));
            let signalMsgSDP = {
                room:  this._room,
                intent: this._whois === 'caller' ? 'offer' : 'answer',
                desc: await this._locksmith.uint8ArrayToBase64(new Uint8Array(encrypted.chipher)),
                nonce: await this._locksmith.uint8ArrayToBase64(encrypted.nonce)
            };
            this._sendSignal(signalMsgSDP);
        }

        this.log(`[webrtc/pc] ICE candidate: ${event.candidate ? event.candidate.candidate : `null`}`);
    }

    async _onAddIceCandidateSuccess() {
        this.log('[webrtc/pc] successfully added ice candidate');
    }

    async _onAddIceCandidateError(error) {
        this.logerror(`[webrtc/pc] failed to add ice candidate: '${error.toString()}'`);
    }

    /* -----------------------------------------------------------------------*/
    _subscribeToDataChannelEvents(dc) {
        dc.onclose = this.#_onDataChannelClose.bind(this);
        dc.onerror = this.#_onDataChannelError.bind(this);
        dc.onopen = this.#_onDataChannelTextOpen.bind(this);
        dc.onmessage = this.#_onDataChannelText.bind(this);
    }

    /*
        Data channel events
    */
    async #_onDataChannel(event) {
        let dc = event.channel;
        this.log(`[webrtc/dc] data channel received: ${dc.label}`);

        if (dc.label === 'text') {
            this._textDC = dc;
            this._subscribeToDataChannelEvents(dc);
        } else if (dc.label.startsWith('file_')) {
            const label = dc.label.split('_', 3);
            const id = label[1];
            const size = Number(label[2]);
            const filename = dc.label.replace(this.labelPrefix(label[1], label[2]), '');
            this.emit('onpeerfilemetadata', {id: id, data: {name: filename, size: size}}).then(() => {
                this._fileDCs[id] = new FileDC(id, dc, this._debug);
                this._fileDCs[id].on('onpeerfile', function(event) {
                    this.emit('onpeerfile', event);
                }.bind(this));
            });
        }
    }

    async #_onDataChannelClose(_event) {
        if (this._textDC && this._textDC.readyState !== 'open') {
            this.emit('onpeerdisconnected', {status: this._textDC.readyState});
        }
        this.log(`[webrtc/dc] data channel closed (user closed: ${this._userClosed})`);
    }

    async #_onDataChannelError(event) {
        if (this._textDC && this._textDC.readyState !== 'open') {
            this.emit('onpeerdisconnected', {status: this._textDC.readyState});
        }
        this.logerror(`[webrtc/dc] dc error occurred: '${event.error}'`);
    }

    async #_onDataChannelText(event) {
        let msg = JSON.parse(event.data);
        this.emit('onpeermessage', {id: msg.id, data: msg.data});
        this.log(`[webrtc/tc] message received: '${event.data}'`);
    }

    async #_onDataChannelTextOpen(_event) {
        this.emit('onpeerconnected', {status: this._textDC.readyState});
        this.log('[webrtc/tc] text channel open');
    }

    labelPrefix(id, size) {
        return 'file_' + id + '_' + size + '_';
    }

    log(msg) {
        if (this._debug) {
            console.log(msg);
        }
    }

    logerror(msg) {
        console.error(msg);
    }
}

class Caller extends PeerConnection {
    constructor(signal, configuration, room, ls, debug = false) {
        super('caller', signal, configuration, room, ls, debug);
        this.#dial();
        this._pc.onconnectionstatechange = this.#_onConnectionStateChange.bind(this);
        setTimeout(function() {
            if (!this._queried) {
                this._querySignal(this.#accept);
            }
        }.bind(this),60000);
    }

    async #createTextDC() {
        // create text data channel
        this._textDC = this._pc.createDataChannel('text', {ordered: true});
        this._subscribeToDataChannelEvents(this._textDC);
    }

    async #dial() {
        if (this._debug) {
            this.log(`[webrtc/tc] data channel created: '${this._room}'`);
        }

        await this.#createTextDC();

        await this._pc.createOffer().then(
            this._onSession.bind(this),
            this._onCreateSessionDescriptionError.bind(this)
        );
    }

    async #accept(answer) {
        let desc = new RTCSessionDescription(JSON.parse(answer));
        await this._pc.setRemoteDescription(desc);
        for (const candidate of this._candidates) {
            try {
                await this._pc
                    .addIceCandidate(candidate)
                    .then(
                        this._onAddIceCandidateSuccess.bind(this),
                        this._onAddIceCandidateError.bind(this)
                    );
            } catch (e) {
                this.logerror(`[webrtc/pc] error adding received ice candidate: '${e.toString()}'`);
            }

            this._candidates = [];
        }
    }

    async #_onConnectionStateChange(_event) {
        this.log(`[webrtc/pc] connection state changed '${this._pc.connectionState}' / '${this._pc.iceConnectionState}'`);
        const state = this.connectionState;

        if (state === 'connected') {
            this.emit('onpeerconnected', {status: 'connected'});
        } else if (state === 'disconnected'){
            this.emit('onpeerdisconnected', {status: this.connectionState});
        } else if (state === 'failed') {
            this.hangup();
        } else if (state === 'connecting') {
            setTimeout(function() {
                if (!this._queried) {
                    this._querySignal(this.#accept);
                }
            }.bind(this),3000);
        }
    }
}

class Callee extends PeerConnection {
    constructor(signal, configuration, room, ls, debug = false) {
        super('callee', signal, configuration, room, ls, debug);
        this._querySignal(this.#answer)
    }

    async #answer(offer) {
        let desc = new RTCSessionDescription(JSON.parse(offer));
        await this._pc.setRemoteDescription(desc);
        await this._pc.createAnswer().then(
            this._onSession.bind(this),
            this._onCreateSessionDescriptionError.bind(this)
        );
    }
}
let _debug = false;

let main = getEl('main');
let setup = getEl('setup');
let statusText = getEl('status');
let statusIndicator = getEl('status-indicator');
let messages = getEl('messages');
let message = getEl('message');
let cword1 = getEl('cword1');
let cword2 = getEl('cword2');
let cpin = getEl('cpin');
let ccword1 = getEl('ccword1');
let ccword2 = getEl('ccword2');
let ccpin = getEl('ccpin');
let notifications = getEl('notifications');
let qrCode = getEl('qrcode');
let qrImage = getEl('qrimage');

let keys = [];
let peer;

let files = {};

let peerSignalReceived = false;

const chunkSize = 8192;
const pageURL = window.location.href.split('#')[0];

let qr = null;

let historyState = {}

window.onload = function () {
    if (window.location.protocol === 'http:' && !window.location.host.startsWith('localhost')) {
        window.location.protocol = 'https:';
        return;
    }

    setLanguage('en_US');

    qr = new QRious({element: qrCode, value: pageURL, size: 128});

    message.focus();
    let hashVal = window.location.href.split('#')[1];
    if (hashVal !== undefined && hashVal !== '') {
        message.innerText = '/' + decodeURI(hashVal);
        notify(`${lang['n_hash_command']}: ${message.innerText}`);
    }

    getEl('version-number').innerText = version;
};

message.addEventListener('paste', (event) => {
    event.preventDefault();

    const paste = (event.clipboardData || window.clipboardData).getData('text');
    message.innerText += paste;
});

message.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        var msg = message.innerText.trim();
        if (msg.startsWith('/')) {
            let cmd = msg.replace(/\s+/g, ' ').trim().split(' ');
            handleCommand(cmd[0].substring(1), cmd.slice(1));
        } else {
            cmdSend(msg);
        }
        message.innerText = '';
        message.focus();
    }
});

async function handleCommand(cmd, args) {
    if (lang === null) {
        setLanguage('en_US');
    }
    switch(cmd) {
        case 'help':
        case 'h':
            history.pushState(historyState, 'Help', '#help');
            cmdHelp();
            p();
            break;
        case 'privacy':
        case 'p':
            history.pushState(historyState, 'Privacy', '#privacy');
            cmdPrivacy();
            p();
            break;
        case 'clean':
        case 'clear':
        case 'n':
            history.pushState(historyState, 'Clear', '#clear');
            cmdClean();
            break;
        case 'file':
        case 'f':
            cmdFile();
            break;
        case 'create':
        case 'c':
            history.pushState(historyState, 'Chat room', '#room');
            cmdCreate();
            p();
            break;
        case 'join':
        case 'j':
            history.pushState(historyState, 'Chat room', '#room');
            cmdJoin(args);
            p();
            break;
        case 'leave':
        case 'quit':
        case 'exit':
        case 'q':
            history.pushState(historyState, 'secretpeer', '/');
            cmdLeave();
            break;
        case 'debug':
        case 'd':
            cmdDebug();
            break;
        case 'version':
        case 'v':
            history.pushState(historyState, 'App version', '#version');
            cmdVersion();
            p();
            break;
        default:
            notify(`${lang['n_unknown_command']}: ${cmd}`);
    }
}

async function p() {
    if (window.signal !== undefined) {
        window.signal.pageview();
    }
}

async function cmdClean() {
    files = {};
    messages.innerHTML = '';
    showHide('messages');
}

async function cmdCreate() {
    await cmdClean();
    generate().then(() => {
        if (qr === null) {
            qr = new QRious({element: qrCode, value: pageURL, size: 128});
        }
        qr.set({value: encodeURI(pageURL + '#j ' + keys.join(' '))});
        qrImage.innerHTML = '';
        qrImage.appendChild(qr.image);
        messages.innerHTML = setup.innerHTML;
        if (lang === undefined) {
            setLanguage('en_US');
        }
        statusText.innerText = lang['status_initializing_signal'];
        prepare().then((result) => {
            [ls, room] = result;
            dial(ls, room);
            statusText.innerText = lang['status_waiting_participant'];
        });
    });
}

async function cmdJoin(args) {
    if (!words.includes(args[0])) {
        notify(`${lang['n_invalid_word']}#1: ${args[0]}`);
        throw new Error(`invalid word: ${args[0]}`);
    }
    if (!words.includes(args[1])) {
        notify(`${lang['n_invalid_word']}#2: ${args[1]}`);
        throw new Error(`invalid word: ${args[1]}`);
    }
    if (!(!isNaN(parseFloat(args[2])) && isFinite(args[2])) || args[2].length !== 6) {
        notify(`${lang['n_invalid_pin']}: ${args[2]}`);
        throw new Error(`pincode must be a 6 digit number! ${args[2]}`);
    }

    await cmdClean();
    prepare(args.slice(0,3)).then((result) => {
        [ls, room] = result;
        setTimeout(function() {
            answer(ls, room);
            statusText.innerText = lang['status_waiting_participant'];
        }, 1000);
    });
}

async function cmdFile() {
    if (!peer || !peer.isConnected) {
        notify(lang['n_peer_connection_needed_for_file_transfer']);
        throw new Error('peer connection is not established!');
    }
    let io = createEl('input');
    io.type = 'file';
    io.multiple = 'multiple';

    io.onchange = e => {
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            sendFileToPeer(file);
        }
    }

    io.click();
}

const sendFileToPeer = async (file) => {
    if (file.size === 0) {
        notify(lang['n_empty_file']);
        throw new Error('empty file transfer is not allowed!');
    }

    const id = newID();

    messages.appendChild(buildAttachmentNode('message-outgoing', id, '📎 ' + file.name + ` (${humanFileSize(file.size)})`));
    main.scrollTop = main.scrollHeight;

    peer.createFileDC(id, file.name, file.size);
    sleep(1000);

    let offset = 0;
    let reader = new FileReader();

    const readChunk = offset => {
        if (!peer || peer.isFailed) {
            // nothing we can do when the connection has failed
            notify(lang['n_peer_connection_failed']);
            return;
        }
        if (!peer.hasBuffer(id)) {
            sleep(1).then(() => {
                readChunk(file, offset);
            });
            if (_debug) {
                console.log('*** wait ', offset, chunkSize);
            }
            return;
        }
        if (_debug) {
            console.log('*** file load chunk ', offset, chunkSize);
        }
        const slice = file.slice(offset, offset + chunkSize);
        reader.readAsArrayBuffer(slice);
    };

    // here we tell the reader what to do when it's done reading...
    reader.onload = event => {
        if (_debug) {
            console.log('*** file chunk loaded', offset, chunkSize);
        }
        let bin = event.target.result;
        peer.sendFile(id, bin);
        offset += bin.byteLength;

        const percentage = Math.round(offset / file.size * 100);
        const percentNode = getEl('p_' + id);
        percentNode.innerText = ' (' + percentage + '%)';

        if (offset < file.size) {
            readChunk(offset);
        } else {
            percentNode.remove();
            if (_debug) {
                console.log('*** file transfer completed');
            }
        }
    };

    readChunk(offset);
}

async function cmdSend(msg) {
    if (msg === '') {
        return;
    }
    if (!peer) {
        notify(lang['n_peer_connection_not_established']);
        throw new Error('peer is not initialized');
    }
    if (!peer.isConnected) {
        const status = lang['status_' + peer.connectionState];
        statusText.innerText = status;
        notify(status);
        throw new Error(`trying to send on connection state ${peer.connectionState}`);
    }
    const id = newID();
    peer.sendText({id: id, data: msg});
    messages.appendChild(buildNode('message-outgoing', id, msg));
    main.scrollTop = main.scrollHeight;
}

async function cmdLeave() {
    cmdClean();
    if (peer) {
        await peer.hangup();
    }
    notify('Please wait, reloading the window in a second!');
    setTimeout(function(){
        location.reload();
    },1000);
}

async function cmdDebug() {
    notify(lang['n_debug_enabled']);
    _debug = true;
    if (peer) {
        peer._debug = _debug;
    }
}

async function cmdVersion() {
    showHide('version');
}

async function cmdHelp() {
    showHide('help');
}

async function cmdPrivacy() {
    showHide('privacy');
}

async function notify(msg, log = _debug) {
    if (log) {
        console.log(`[notify] ${msg}`);
    }
    let notification = createEl('div');
    notification.classList.add('notification');
    notification.innerText = msg;
    notifications.appendChild(notification);
    setTimeout(function(){
        notifications.removeChild(notification);
    },4000);
}

async function subscribeToPeerEvents() {
    /*Messaging*/
    peer.on('onpeerconnected', function(_event) {
        if (statusText.innerText !== lang['status_connected']) {
            notify(lang['n_connected_to_peer']);
        }
        statusText.innerText = lang['status_connected'];
        statusIndicator.className = 'green';
    });
    peer.on('onpeerdisconnected', function(event) {
        if (event.status === 'failed') {
            notify(lang['n_failed_to_establish_connection']);
        } else if ((!peer || !peer.isConnected) && statusText.innerText !== lang['status_disconnected']) {
            notify(lang['n_disconnected_from_peer']);
        }
        statusText.innerText = peer && peer.isConnected ? lang['status_connected'] : lang['status_disconnected'];
        statusIndicator.className = 'red';
    });
    peer.on('onpeermessage', function(event) {
        receive(event.id, event.data);
    });
    peer.on('onpeerfilemetadata', function(event) {
        receiveFileMetadata(event.id, event.data);
    });
    peer.on('onpeerfile', function(event) {
        receiveFile(event);
    });

    /*Signal*/
    peer.on('onsignalopen', function(_event) {
        notify(lang['n_secret_room_created']);
    })
    peer.on('onsignalclose', function(_event) {
        if (peer && !peer.isConnected) {
            if (!peerSignalReceived) {
                notify(lang['n_nobody_joined_to_room']);
            } else {
                notify(lang['n_could_not_establish_peer_connection']);
            }
            statusText.innerText = lang['status_disconnected'];
            statusIndicator.className = 'red';
            peer.hangup();
            peer = null;
        }
    });
    peer.on('onsignalerror', function(event) {
        notify(lang['n_signaling_error']);
        statusText.innerText = lang['status_disconnected'];
        statusIndicator.className = 'red';
        peer.hangup();
        peer = null;
    });
    peer.on('onsignalmessage', function(event) {
        if (event.status === 'wait') {
            notify(lang['n_waiting_participant']);
        } else if (event.status === 'ready') {
            notify(lang['n_participant_joined']);
            handleCommand('clear');
            statusText.innerText = lang['status_connecting'];
            peerSignalReceived = true;
        }
        statusIndicator.className = 'yellow';
    });
}

async function generate() {
    keys = KeyMaker.random();
    cword1.innerText = keys[0];
    cword2.innerText = keys[1];
    cpin.innerText = keys[2];
    ccword1.innerText = keys[0];
    ccword2.innerText = keys[1];
    ccpin.innerText = keys[2];
}

async function prepare(joinKeys = keys) {
    let ls;
    try {
        ls = new Locksmith(joinKeys[0], joinKeys[1], joinKeys[2]);
    } catch (e) {
        notify(lang['n_could_not_init_encryption_library']);
        statusText.innerText = lang['status_failed'];
        throw new Error(`Could not init encryption library: ${e.toString()}`);
    }
    if (ls === null) {
        return
    }

    if (peer !== undefined && peer !== null) {
        await peer.hangup();
        peer = null;
    }
    peerSignalReceived = false;
    let room;
    try {
        room = await ls.digest();
    } catch(e) {
        notify(lang['n_could_not_init_encryption_library']);
        statusText.innerText = lang['status_failed'];
        throw new Error(`Could not init encryption library: ${e.toString()}`);
    }

    return [ls, room];
}

async function dial(ls, room) {
    peer = new Caller(signalURL, configuration, room, ls, _debug);
    await subscribeToPeerEvents();
}

async function answer(ls, room) {
    peer = new Callee(signalURL, configuration, room, ls, _debug);
    await subscribeToPeerEvents();
    main.scrollTop = main.scrollHeight;
}

async function showHide(show) {
    for (let n of getEl('main-content').childNodes) {
        n.hidden = true;
    }
    getEl(show).hidden = false;
}

function receiveFileMetadata(id, metadata) {
    metadata['id'] = id;
    files[id] = {
        buffer: [],
        metadata: metadata,
        size: 0
    }
    if (_debug) {
        console.log('*** file metadata', files[id].metadata);
    }

    const node = buildAttachmentNode('message-incoming', id, '📎 ' + metadata.name + ` (${humanFileSize(files[id].metadata.size)})`);
    messages.appendChild(node);
    main.scrollTop = main.scrollHeight;
}

function receive(id, data) {
    messages.appendChild(buildNode('message-incoming', id, data));
    main.scrollTop = main.scrollHeight;
}

function receiveFile(event) {
    const id = event.id;
    const data = event.data;
    files[id].buffer.push(data);
    files[id].size += data.byteLength;
    const percentage = Math.round(files[id].size / files[id].metadata.size * 100);
    const percentNode = getEl('p_' + id);
    percentNode.innerText = ' (' + percentage + '%)';
    if (files[id].size === files[id].metadata.size) {
        const received = new Blob(files[id].buffer);
        let downloadAnchor = createEl('a');
        downloadAnchor.href = URL.createObjectURL(received);
        downloadAnchor.download = files[id].metadata.name;
        downloadAnchor.textContent =
          `${files[id].metadata.name} (${humanFileSize(files[id].metadata.size)})`;
        const node = getEl('m_' + id);
        node.innerHTML = '<span>📎 </span>';
        node.appendChild(downloadAnchor);
        node.appendChild(buildTime());
        peer.destroyFileDC(id);

        delete files[id];
        if (_debug) {
            console.log('***file tranfer completed');
        }
    }
}

function buildNode(type, id, msg) {
    let node = createEl('div');
    node.classList.add('message');
    node.classList.add(type === 'message-outgoing' ? 'text-right' : 'text-left');
    let input = createEl('div');
    input.classList.add(type)
    let content = buildContent(id, msg);
    content.appendChild(buildTime());
    input.appendChild(content);
    node.appendChild(input);
    return node;
}

function buildAttachmentNode(type, id, msg) {
    let node = createEl('div');
    node.classList.add('message');
    node.classList.add(type === 'message-outgoing' ? 'text-right' : 'text-left');
    node.classList.add('attachment');
    let input = createEl('div');
    input.classList.add(type)
    let content = buildContent(id, msg);
    content.appendChild(buildPercentage(id));
    content.appendChild(buildTime());
    input.appendChild(content);
    node.appendChild(input);
    return node;
}

function buildPercentage(id) {
    let percentNode = createEl('span');
    percentNode.id = 'p_' + id;
    percentNode.innerHTML = ' (0%)';
    return percentNode;
}

function buildTime() {
    let node = createEl('sub');
    node.classList.add('message-time')
    const date = new Date();
    node.innerText = pad2(date.getHours()) + ':' + pad2(date.getMinutes());
    return node;
}

function buildContent(id, msg) {
    let node = createEl('div');
    node.classList.add('content')
    node.id = 'm_' + id;
    node.innerText = msg;
    return node;
}

function pad2(number) {
    return (number < 10 ? '0' : '') + number
}

function newID() {
    return new Date().getTime() + random();
}

function random() {
    return (Math.floor(Math.random() * Math.floor(999999)) + '').padStart(6, '0');
}

function humanFileSize(bytes) {
    const thresh = 1000;
    const dp = 1;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10**dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

function getEl(id) {
    return document.getElementById(id);
}

function createEl(tag) {
    return document.createElement(tag);
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
