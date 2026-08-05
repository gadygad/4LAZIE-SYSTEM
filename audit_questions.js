const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    const col = db.collection('questions');

    // 1. Total count
    const total = await col.countDocuments({ subjectId });
    console.log(`\n📊 JUMLA YA MASWALI: ${total}`);

    // 2. Count by unit/module
    const byModule = await col.aggregate([
      { $match: { subjectId } },
      { $group: { _id: "$moduleName", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();

    console.log(`\n📁 MASWALI KWA KILA UNIT/MODULE:`);
    byModule.forEach(m => {
      console.log(`   ${m._id || '(hakuna moduleName)'}: ${m.count}`);
    });

    // 3. Count by category
    const byCategory = await col.aggregate([
      { $match: { subjectId } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();

    console.log(`\n🗂️  MASWALI KWA KILA CATEGORY:`);
    byCategory.forEach(c => {
      console.log(`   ${c._id || '(hakuna category)'}: ${c.count}`);
    });

    // 4. Detect duplicates by questionText
    const duplicates = await col.aggregate([
      { $match: { subjectId } },
      { $group: { _id: "$questionText", count: { $sum: 1 }, ids: { $push: "$_id" } } },
      { $match: { count: { $gt: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    if (duplicates.length === 0) {
      console.log(`\n✅ HAKUNA DUPLICATION - Maswali yote ni ya pekee!`);
    } else {
      console.log(`\n⚠️  DUPLICATES ZILIZOPATIKANA: ${duplicates.length}`);
      duplicates.forEach((d, i) => {
        console.log(`   ${i+1}. [${d.count}x] "${d._id.substring(0,80)}..."`);
      });

      // Auto-remove duplicates (keep first, delete rest)
      let removed = 0;
      for (const dup of duplicates) {
        const idsToDelete = dup.ids.slice(1); // keep first
        await col.deleteMany({ _id: { $in: idsToDelete } });
        removed += idsToDelete.length;
      }
      console.log(`\n🗑️  Duplicates ${removed} zimeondolewa kiotomatiki.`);
      
      const newTotal = await col.countDocuments({ subjectId });
      console.log(`📊 JUMLA BAADA YA KUONDOA DUPLICATES: ${newTotal}`);
    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
