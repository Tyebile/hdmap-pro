export function udfType(udf_type){
    switch(udf_type) { 
        case 0: { 
            udf_type = '普通区域';
            break; 
        } 
        case 1: { 
            udf_type = '普通折线';
            break; 
        } 
        case 2: { 
            udf_type = '监控线';
            break; 
        } 
        case 3: { 
            udf_type = '普通区域';
            break; 
        } 
        case 4: { 
            udf_type = '点物标';
            break; 
        } 
        case 5: { 
            udf_type = '文本物标';
            break; 
        } 
        case 6: { 
            udf_type = '圆物标';
            break; 
        } 
        case 7: { 
            udf_type = '索引线物标';
            break; 
        } 
        case 8: { 
            udf_type = '监管区';
            break; 
        } 
        case 9: { 
            udf_type = '搁浅区';
            break; 
        } 
        case 10: { 
            udf_type = '会遇区';
            break; 
        } 
        case 11: { 
            udf_type = '保护区';
            break; 
        } 
        case 12: { 
            udf_type = '航道';
            break; 
        } 
        case 13: { 
            udf_type = '关联区';
            break; 
        } 
        case 14: { 
            udf_type = '系统边界';
            break; 
        } 
        case 15: { 
            udf_type = '锚区';
            break; 
        } 
        case 16: { 
            udf_type = '限制区';
            break; 
        } 
        case 17: { 
            udf_type = '手动关联区';
            break; 
        } 
        case 18: { 
            udf_type = '自动关联区';
            break; 
        }
    }
    return udf_type; 
}