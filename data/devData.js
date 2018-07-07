const words = ['forgetting', 'forgotten', 'beginning', 'beginner', 'prefer', 'preferred', 'gardening', 'gardener', 'limiting', 'limited', 'limitation', 'myth', 
'gym', 'pyramid', 'mystery', 'young', 'touch', 'double', 'trouble', 'country', 'disappoint', 'disagree', 'disobey', 'misbehave', 'mislead', 'misspell', 'inactive', 
'incorrect', 'illegal', 'illegible', 'immature', 'immortal', 'irregular', 'irrelevant', 'redo', 'refresh', 'return', 'reappear', 'redecorate', 'irresponsible', 
'impossible', 'impatient', 'imperfect', 'subdivide', 'subheading', 'submarine', 'submerge',  'interact', 'intercity', 'international', 'interrelated', 
'supermarket', 'superman', 'superstar', 'antiseptic', 'anticlockwise', 'antisocial', 'autobiography', 'autograph', 'information', 'adoration', 'sensation', 
'preparation', 'admiration', 'sadly', 'completely', 'usually', 'comically', 'happily', 'angrily', 'gently', 'simply', 'humbly', 'nobly', 'basically', 
'frantically', 'dramatically', 'measure', 'treasure', 'pleasure', 'enclosure', 'creature', 'furniture', 'picture', 'nature', 'adventure', 'division', 'invasion', 
'confusion', 'decision', 'collision', 'television', 'poisonous', 'dangerous', 'mountainous', 'famous', 'various', 'tremendous', 'enormous', 'jealous', 'humorous', 
'glamorous', 'vigorous', 'courageous', 'outrageous', 'serious', 'obvious', 'curious', 'hideous', 'spontaneous', 'courteous', 'invention', 'injection', 'action', 
'hesitation', 'completion', 'expression', 'discussion', 'confession', 'permission', 'admission', 'expansion', 'extension', 'comprehension', 'tension', 'musician', 'electrician', 'magician', 'politician', 'mathematician', 'scheme', 'chorus', 'chemist', 'echo', 'character', 'chef', 'chalet', 'machine', 'brochure', 'league', 
'tongue', 'antique', 'unique', 'science', 'scene', 'discipline', 'fascinate', 'crescent', 'vein', 'weigh', 'eight', 'neighbour', 'they', 'obey', 'accident', 
'accidentally', 'actual', 'actually', 'address', 'answer', 'appear', 'arrive', 'believe', 'bicycle', 'breath', 'breathe', 'build', 'busy', 'business', 'calendar', 
'caught', 'centre', 'century', 'certain', 'circle', 'complete', 'consider', 'continue', 'decide', 'describe', 'different', 'difficult', 'disappear', 'early', 
'earth', 'eight', 'eighth', 'enough', 'exercise', 'experience', 'experiment', 'extreme', 'famous', 'favourite', 'forward', 'forwards', 'fruit', 'grammar', 'group',
 'guard', 'guide', 'heard', 'heart', 'height', 'history', 'imagine', 'increase', 'important', 'interest', 'island', 'knowledge', 'learn', 'length', 'library', 
 'material', 'medicine', 'mention', 'minute', 'natural', 'naughty', 'notice', 'occasion', 'occasionally', 'often', 'opposite', 'ordinary', 'particular', 
 'peculiar', 'perhaps', 'popular', 'position', 'possess', 'possession', 'possible', 'potatoes', 'pressure', 'probably', 'promise', 'purpose', 'quarter', 
 'question', 'recent', 'regular', 'reign', 'remember', 'sentence', 'separate', 'special', 'straight', 'strange', 'strength', 'suppose', 'surprise', 'therefore', 
 'though', 'although', 'thought', 'through', 'various', 'weight', 'woman', 'women', 'teacher', 'catcher', 'richer', 'stretcher', 'hedge',
 'accept', 'except', 'affect', 'effect', 'ball', 'bawl', 'berry', 'bury', 'brake', 'break', 'fair', 'fare', 'grate', 'great',
 'grown', 'groan', 'here', 'hear', 'heel', 'heal', 'heal', 'he\'ll', 'heel', 'knot', 'not', 'mail', 'male', 'main', 'mane',
 'meat', 'meet', 'medal', 'meddle', 'missed', 'mist', 'peace', 'piece', 'plain', 'plane', 'rain', 'rein', 'reign',
 'scene', 'seen', 'weather', 'whether', 'whose', 'who\'s'
];

const prefixes = [ 'dis', 'mis', 'in', 'il', 'im', 'ir', 're', 'sub', 'inter', 'super', 'anti', 'auto', 'ei', 'sc', 'ch', 'pre', 'ex', 'gu', 'diff', 'poss', 'str', 'ad' ];

const suffixes = ['ing', 'en', 'er', 'ed', 'ion', 'ery', 'ation', 'ly', 'ure', 'tion', 'sion', 'cian', 'ous', 'ious', 'eous', 'gue', 'que', 'ey', 'ise', 'ose', 'gth', 'ar', 'th', 'ry', 'te', 'dge' ];

const medial = ['y', 'ou', 'ei', 'sc', 'ch', 'ear', 'au'];

module.exports = {words, prefixes, suffixes, medial};
