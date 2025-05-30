//■[ 危険文字を半角スペースに変換し無害化 ]
//・例：「a<b>c&d"e'f`g　hijk」→「a b c d e f g hijk」
export const dangerousCharToSpace = (str:string) => {
    if (!str) return "";
    return str.replace(
        /[<>&|"'`;　=%?!\\]/g,
        () => ' '
    );  
}

//■[ 危険文字をエンティティ化 ]
const escapeToEntity: { [key: string]: string } = {
    '<': '&lt;',
    '>': '&gt;',
    '/': '&#x2f;',
    '&': '&amp;',
    '|': '&#x7c;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    ';': '&#059;',
    '=': '&#x3d;',
    '%': '&#x25;',
    '?': '&#x3f;',
    '!': '&#x21;',
    '#': '&#x23;',
    '@': '&#x40;',
    '*': '&#x2a;',
    '\\': '&#092;',
    '+': '&#x2b;',
    '-': '&#x2d;',
};
export const dangerousCharToEntity = (str: string) => {
    if (!str) return "";
    return str.replace(
        /[<>/&|"'`;=%?!#@*\\\+\-]/g, 
        (match) => escapeToEntity[match]
    );  
}
//■[ エンティティ化を元に ]
const unescape: { [key: string]: string } = {
    '&lt;': '<',
    '&gt;': '>',
    '&#x2f;': '/',
    '&amp;': '&',
    '&#x7c;': '|',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x60;': '`',
    '&#059;': ';',
    '&#x3d;': '=',
    '&#x25;': '%',
    '&#x3f;': '?',
    '&#x21;': '!',
    '&#x23;': '#',
    '&#x40;': '@',
    '&#x2a;': '*',
    '&#092;': '\\',
    '&#x2b;': '+',
    '&#x2d;': '-',
};
export const entityToDangerousChar = (str: string) => {
    if (!str) return "";
    return str.replace(
        /(&lt;|&gt;|&#x2f;|&amp;|&#x7c;|&quot;|&#x27;|&#x60;|&#059;|&#x3d;|&#x25;|&#x3f;|&#x21;|&#x23;|&#x40;|&#x2a;|&#092;|&#x2b;|&#x2d;)/g,
        ( match ) => unescape[match]
    );
}


//■[ 汎用的なXSS対策 ]
export const validationForWord = (str:string,limit:number=20): {result:boolean, message:string} => {
    // 長さ1～20の範囲
    if (str.length===0 || str.length>limit) return {result:false, message:`1～${limit}字以内の文字列を入力して下さい`}
	//htmlエンティティ
	const pattern = /[<>/&|"'`;=%?!#@*\\\+\-]/;
	if(pattern.test(str))return{result:false, message:'半角「<>/&|"\'`;=%?!#@*\\+-」は使用不可。使用する場合、全角で！'};
    // 成功!!
    return {result:true,message:'success'}
}

//■[ メールアドレスのバリデーション ]
export const validationForEmail = (str:string): {result:boolean, message:string} => {
    //長さ1～50の範囲
    if(str.length===0 || str.length>50)return {result:false, message:'1～50字以内のメールアドレを入力して下さい'};
    //email形式
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const result = emailRegex.test(str)
    if(!result)return {result:false, message:'有効なメールアドレスの形式でありません'};
    // 成功!!
    return {result:true,message:'success'}
}

//■[ パスワードのバリデーション ]
export const validationForPassword = (str:string): {result:boolean, message:string} => {
    //長さ5～50の範囲
    if(str.length<5 || str.length>50)return {result:false, message:'5～50字以内の半角の英数字を入力して下さい'};
    //email形式
    const passwordRegex = /^[A-Za-z0-9]+$/;
    const result = passwordRegex.test(str);
    if(!result)return {result:false, message:'半角の英数字で入力して下さい'};
    // 成功!!
    return {result:true,message:'success'}
}

//■[ authenticationPassword(6桁の数字) ]
export const validationForAuthenticationPassword = (str:string): {result:boolean, message:string} => {
    //6桁
    if(str.length!==6)return {result:false, message:'6桁の半角数字を入力して下さい'};
    //半角数字
    const passwordRegex = /^[0-9]+$/;
    const result = passwordRegex.test(str);
    if(!result)return {result:false, message:'半角数字で入力して下さい'};
    // 成功!!
    return {result:true,message:'success'}
}
