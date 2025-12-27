/**
 * 智慧房东App广告屏蔽脚本
 * 功能：通过修改响应体屏蔽开屏广告和Banner广告
 * 防闪退机制：返回空数据而非拦截请求，保持App正常运行
 */

const adType = $argument; // 从插件参数获取广告类型：appOpenAds 或 bannerPicMore
const url = $request.url;

// 获取原始响应体
let body = $response.body;

try {
    // 解析JSON响应
    let obj = JSON.parse(body);
    
    // 判断广告类型并修改响应
    if (adType === 'appOpenAds' && url.includes('/appOpenAds')) {
        // 开屏广告：返回空数据
        // 保持success和message字段，只清空data，避免App报错
        console.log('🚫 [智慧房东] 已屏蔽开屏广告');
        obj.data = null;
        
    } else if (adType === 'bannerPicMore' && url.includes('/bannerPicMore')) {
        // Banner广告：返回空数组
        // 保持success和message字段，只清空data数组，避免App报错
        console.log('🚫 [智慧房东] 已屏蔽Banner广告');
        obj.data = [];
    }
    
    // 将修改后的对象转回JSON
    body = JSON.stringify(obj);
    
} catch (error) {
    // 如果解析失败，输出错误日志但不影响App运行
    console.log('⚠️ [智慧房东] 响应解析失败: ' + error);
}

// 返回修改后的响应体
$done({ body });
