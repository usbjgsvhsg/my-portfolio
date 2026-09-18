// مراقبة ظهور صندوق النتائج وإضافة زر المشاركة داخله فوراً
function injectShareButton() {
    // التحقق من عدم تكرار الزر
    if (document.getElementById('share-result-btn')) return;

    // البحث عن حاوية الأزرار أو النتيجة النهائية في الصفحة
    const actionButton = document.querySelector('button'); 
    const container = document.querySelector('.container') || document.body;

    // إنشاء زر المشاركة بتصميم متناسق 100% مع واجهة v1.0 Neural Core
    const shareBtn = document.createElement('button');
    shareBtn.id = 'share-result-btn';
    shareBtn.innerText = '📤 مشاركة النتيجة';

    shareBtn.style.width = '100%';
    shareBtn.style.marginTop = '15px';
    shareBtn.style.padding = '12px';
    shareBtn.style.backgroundColor = '#38bdf8';
    shareBtn.style.color = '#0b0f19';
    shareBtn.style.border = 'none';
    shareBtn.style.borderRadius = '8px';
    shareBtn.style.fontWeight = 'bold';
    shareBtn.style.cursor = 'pointer';
    shareBtn.style.transition = 'background 0.3s ease';

    shareBtn.onmouseover = () => shareBtn.style.backgroundColor = '#7dd3fc';
    shareBtn.onmouseout = () => shareBtn.style.backgroundColor = '#38bdf8';

    // حدث الضغط ومشاركة الرابط أو نسخه
    shareBtn.onclick = async () => {
        const shareData = {
            title: 'AI Image Authenticator Result',
            text: 'تم فحص الصورة بنجاح عبر نظام Neural Core. تحقق من تفاصيل التحليل!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ رابط النتيجة إلى الحافظة بنجاح!');
            }
        } catch (err) {
            console.log('خطأ في المشاركة:', err);
        }
    };

    // إدراج الزر بداخل الحاوية الرئيسية للنتائج لتضمن ظهوره دائماً
    if (container) {
        container.appendChild(shareBtn);
    }
}

// فحص دوري لتفعيل الدالة بمجرد ظهور واجهة النتائج
const observer = new MutationObserver(() => {
    if (document.body.innerText.includes('نتيجة التحليل النهائي')) {
        injectShareButton();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
console.log("Direct Share Injector Loaded");

