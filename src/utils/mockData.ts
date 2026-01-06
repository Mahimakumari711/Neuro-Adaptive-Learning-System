import { StudentBiometrics } from '../types/student';

const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William',
  'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander',
  'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Sofia', 'Jackson', 'Avery', 'Sebastian',
  'Ella', 'David', 'Scarlett', 'Joseph', 'Grace', 'Samuel', 'Chloe', 'John', 'Victoria', 'Owen',
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan'
];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Patel', 'Sharma', 'Singh', 'Kumar', 'Das', 'Gupta', 'Choudhury', 'Reddy', 'Nair', 'Kapoor'
];

export function generateMockStudents(): StudentBiometrics[] {
  const students: StudentBiometrics[] = [];
  
  for (let i = 0; i < 50; i++) {
    const engagement = Math.floor(Math.random() * 40) + 50; // 50-90
    const attention = Math.floor(Math.random() * 40) + 50;
    const stress = Math.floor(Math.random() * 30) + 20; // 20-50 range, low baseline
    
    let status: 'active' | 'idle' | 'alert' = 'active';
    if (engagement < 60 || attention < 60) status = 'idle';
    if (stress > 70) status = 'alert';
    
    students.push({
      id: i + 1,
      name: `${firstNames[i]} ${lastNames[i]}`,
      heartRate: Math.floor(Math.random() * 30) + 65, // 65-95 bpm
      hrv: Math.floor(Math.random() * 40) + 40, // 40-80 ms
      eegAlpha: Math.random() * 15 + 8, // 8-23 μV
      engagement,
      attention,
      stress,
      status,
      lastUpdate: new Date(),
    });
  }
  
  return students;
}

export function updateStudentMetrics(student: StudentBiometrics, forceHighStress: boolean = false): StudentBiometrics {
  // Simulate realistic changes in biometric data
  const changeEngagement = (Math.random() - 0.5) * 10;
  const changeAttention = (Math.random() - 0.5) * 10;
  
  // Dynamic stress change based on mode
  let changeStress = 0;
  
  if (forceHighStress) {
    // If we want high stress, bias heavily upwards until we reach ~85
    if (student.stress < 80) {
      changeStress = Math.random() * 15 + 5; // Increase by 5-20
    } else {
      changeStress = (Math.random() - 0.5) * 5; // Fluctuate around high
    }
  } else {
    // Normal mode: bias towards ~35
    if (student.stress > 40) {
      changeStress = (Math.random() * -10) - 2; // Decrease by 2-12
    } else if (student.stress < 20) {
      changeStress = Math.random() * 5 + 1; // Increase slightly
    } else {
      changeStress = (Math.random() - 0.5) * 8; // Random fluctuation
    }
  }
  
  const newEngagement = Math.max(0, Math.min(100, student.engagement + changeEngagement));
  const newAttention = Math.max(0, Math.min(100, student.attention + changeAttention));
  const newStress = Math.max(0, Math.min(100, student.stress + changeStress));
  
  let status: 'active' | 'idle' | 'alert' = 'active';
  if (newEngagement < 60 || newAttention < 60) status = 'idle';
  if (newStress > 70) status = 'alert';
  
  return {
    ...student,
    heartRate: Math.max(60, Math.min(100, student.heartRate + (Math.random() - 0.5) * 4)),
    hrv: Math.max(30, Math.min(90, student.hrv + (Math.random() - 0.5) * 5)),
    eegAlpha: Math.max(5, Math.min(30, student.eegAlpha + (Math.random() - 0.5) * 2)),
    engagement: newEngagement,
    attention: newAttention,
    stress: newStress,
    status,
    lastUpdate: new Date(),
  };
}
